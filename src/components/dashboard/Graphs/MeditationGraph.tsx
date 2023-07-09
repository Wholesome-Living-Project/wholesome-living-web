import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: 2em auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`

const MS_TO_SECONDS = 1000

const MeditationGraph = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState<Error | null>(null) // Explicitly specify the type as Error
  const userId = 'X2GE989qgBdlp2ESSrXWi3Cn4Au1'

  const fetchData = async () => {
    try {
      const [meditationResponse, settingsResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8080/meditation', {
          headers: {
            userId: userId,
          },
        }),
        axios.get('http://127.0.0.1:8080/settings', {
          headers: {
            userId: userId,
          },
        }),
      ])

      if (meditationResponse.data && settingsResponse.data) {
        const transformedMeditationData = meditationResponse.data.map((item: any) => ({
          ...item,
          endTime: new Date(item.endTime * MS_TO_SECONDS),
        }))

        transformedMeditationData.sort((a: any, b: any) => a.endTime - b.endTime)

        const settingsData = settingsResponse.data

        const combinedData = transformedMeditationData.map((item: any) => ({
          endTime: item.endTime.toISOString().slice(0, 10),
          meditationTime: item.meditationTime,
          meditationTimeGoal: settingsData.meditation.meditationTimeGoal,
        }))

        setData(combinedData)
        console.log('Fetched combined data:', combinedData)
      } else {
        console.error('Response data is missing')
        setError(new Error('Response data is missing'))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000) // Fetch data every 5 seconds

    return () => {
      clearInterval(interval) // Clean up the interval when the component unmounts
    }
  }, [])

  const [opacity, setOpacity] = useState({
    meditationTime: 1,
    meditationTimeGoal: 1,
  })

  const handleMouseEnter = useCallback((o) => {
    const { dataKey } = o

    setOpacity((prevOpacity) => ({
      ...prevOpacity,
      [dataKey]: 0.5,
    }))
  }, [])

  const handleMouseLeave = useCallback((o) => {
    const { dataKey } = o

    setOpacity((prevOpacity) => ({
      ...prevOpacity,
      [dataKey]: 1,
    }))
  }, [])

  const legendLabels = {
    meditationTime: 'Meditation Time',
    meditationTimeGoal: 'Meditation Time Goal',
  }

  return (
    <Container>
      <h5>Track your meditation progress</h5>
      {error && <p>Error: {error.message}</p>}
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line
              type="monotone"
              dataKey="meditationTime"
              stroke="#d66ef0"
              name={legendLabels.meditationTime}
              opacity={opacity.meditationTime}
            />
            <Line
              type="monotone"
              dataKey="meditationTimeGoal"
              stroke="#6363F2"
              name={legendLabels.meditationTimeGoal}
              opacity={opacity.meditationTimeGoal}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="endTime" />
            <YAxis label={{ value: 'Meditation time', angle: -90 }} tick={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  )
}

export default MeditationGraph
