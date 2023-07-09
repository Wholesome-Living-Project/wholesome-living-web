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
  overflow: hidden;
`

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
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

const FinanceTable = () => {
  const [data, setData] = useState([])
  const [strategy, setStrategy] = useState(null)
  const [strategyAmount, setStrategyAmount] = useState(null)
  const [error, setError] = useState('')
  const userId = 'X2GE989qgBdlp2ESSrXWi3Cn4Au1'

  const convertHexToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
  }

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
            investedAmount: Number(investedAmount.toFixed(2)),
          }
        })

        setData(transformedFinanceData)
      } else {
        setError('Response data is missing')
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000)

    return () => {
      clearInterval(interval)
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
                <TableHeader>Amount</TableHeader>
                <TableHeader>Invested Amount</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Investment Time</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.investedAmount}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{convertHexToDate(item.spendingTime)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </TableContainer>
  )
}

export default FinanceTable
