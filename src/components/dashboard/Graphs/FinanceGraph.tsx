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

const FinanceGraph = () => {
  const [data, setData] = useState([])
  const [strategy, setStrategy] = useState(null)
  const [strategyAmount, setStrategyAmount] = useState(null)
  const [error, setError] = useState(null)
  const userId = 'X2GE989qgBdlp2ESSrXWi3Cn4Au1'

  const fetchData = async () => {
    try {
      const [investmentResponse, settingsResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8080/finance', { headers: { userId } }),
        axios.get('http://127.0.0.1:8080/settings', { headers: { userId } }),
      ])

      if (investmentResponse.data && settingsResponse.data) {
        const { strategy, strategyAmount } = settingsResponse.data.finance
        setStrategy(strategy)
        setStrategyAmount(strategyAmount)

        const transformedFinanceData = investmentResponse.data.map((item) => {
          let investedAmount = 0

          if (strategy === 'Round') {
            const roundedAmount = Math.ceil(item.amount / strategyAmount) * strategyAmount
            investedAmount = roundedAmount - item.amount
          } else if (strategy === 'Plus') {
            investedAmount = 1
          } else if (strategy === 'Percent') {
            investedAmount = Number((item.amount * (strategyAmount / 100)).toFixed(2))
          }

          return {
            ...item,
            investedAmount,
            spendingTime: new Date(item.spendingTime * MS_TO_SECONDS).toISOString().slice(0, 10),
          }
        })

        transformedFinanceData.sort((a, b) => new Date(a.spendingTime) - new Date(b.spendingTime))

        let totalInvestedAmount = 0

        const monthlyData = transformedFinanceData.reduce((accumulator, item) => {
          const month = item.spendingTime.slice(0, 7)
          totalInvestedAmount = Number((totalInvestedAmount + item.investedAmount).toFixed(2))
          accumulator[month] = {
            investedAmount: totalInvestedAmount,
          }
          return accumulator
        }, {})

        const combinedData = Object.entries(monthlyData).map(
          ([spendingTime, { investedAmount }]) => ({
            spendingTime,
            investedAmount,
            investmentGoal: settingsResponse.data.finance.investmentGoal,
          })
        )

        setData(combinedData)
        console.log('Fetched combined data:', combinedData)
      } else {
        console.error('Response data is missing')
        setError('Response data is missing')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  const [opacity, setOpacity] = useState({
    investedAmount: 1,
    investmentGoal: 1,
  })

  const handleMouseEnter = useCallback((o) => {
    const { dataKey } = o
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 0.5 }))
  }, [])

  const handleMouseLeave = useCallback((o) => {
    const { dataKey } = o
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 1 }))
  }, [])

  const legendLabels = {
    investedAmount: 'Invested Amount',
    investmentGoal: 'Investment Goal',
  }

  return (
    <Container>
      <h5>Track your investment progress</h5>
      {strategy && strategyAmount && (
        <p>
          Strategy: {strategy} ({strategyAmount})
        </p>
      )}
      {error && <p>Error: {error.message}</p>}
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line
              type="monotone"
              dataKey="investedAmount"
              stroke="#ff7300"
              name={legendLabels.investedAmount}
            />
            <Line
              type="monotone"
              dataKey="investmentGoal"
              stroke="#6363F2"
              name={legendLabels.investmentGoal}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="spendingTime" />
            <YAxis label={{ value: 'Invested amount', angle: -90 }} tick={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  )
}

export default FinanceGraph
