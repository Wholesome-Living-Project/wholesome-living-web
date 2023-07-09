import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  max-width: 800px;
  margin: 2em auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensure the rounded corners are applied */
`

const TableWrapper = styled.div`
  max-height: 500px; /* Adjust this value based on your needs */
  overflow-y: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden; /* Ensure the rounded corners are applied */
`

const TableHeader = styled.th`
  padding: 8px;
  background-color: #6363f2;
  color: #fff;
  text-align: left;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

const TableCell = styled.td`
  padding: 8px;
`

const MeditationTable = () => {
  const [data, setData] = useState([])
  const [meditationTimeGoal, setMeditationTimeGoal] = useState(0)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const userId = 'X2GE989qgBdlp2ESSrXWi3Cn4Au1' // Replace with the actual user ID

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
        const meditationData = meditationResponse.data.map((item) => ({
          ...item,
          endTime: new Date(item.endTime * 1000),
        }))

        // Sort the meditationData array based on the endTime values
        meditationData.sort((a, b) => a.endTime - b.endTime)

        setData(meditationData)
        setMeditationTimeGoal(settingsResponse.data.meditation.meditationTimeGoal)
      } else {
        setError('Response data is missing')
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000) // Fetch data every 5 seconds

    return () => {
      clearInterval(interval) // Clean up the interval when the component unmounts
    }
  }, [])

  return (
    <TableContainer>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>End Time</TableHeader>
                <TableHeader>Meditation Time</TableHeader>
                <TableHeader>Meditation Time Goal</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.endTime.toLocaleDateString()}</TableCell>
                  <TableCell>{item.meditationTime}</TableCell>
                  <TableCell>{meditationTimeGoal}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </TableContainer>
  )
}

export default MeditationTable
