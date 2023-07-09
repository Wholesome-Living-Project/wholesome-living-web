import { SPACING } from 'app/theme/theme'
import axios from 'axios'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

interface FinancialData {
  amount: number
  description: string
  spendingTime: Date | null
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto; /* Adjust margin to align with the other component */
  //margin-bottom: ${SPACING * 1.5}px;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`

const FormContainer = styled.form`
  margin-bottom: 2em;
`

const FormGroup = styled.div`
  margin-bottom: 1.5em;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-weight: 600;
  font-size: 14px;
  color: #555;
`

interface InputProps {
  invalid?: boolean
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.invalid ? 'red' : '#ccc')};
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #6363f2;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6363f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #006699;
  }
`

const DatePickerInput = styled(Input)`
  cursor: pointer;
`

const FinanceForm: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    amount: 0,
    description: '',
    spendingTime: null,
  })

  const [validationErrors, setValidationErrors] = useState<Partial<FinancialData>>({})

  const resetForm = () => {
    setFinancialData({
      amount: 0,
      description: '',
      spendingTime: null,
    })
    setValidationErrors({})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const parsedValue = name === 'amount' ? parseInt(value) : value // Parse amount field to number
    setFinancialData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }))
  }

  const handleDateChange = (date: Date | null) => {
    setFinancialData((prevData) => ({
      ...prevData,
      spendingTime: date,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validation checks
    const errors: Partial<FinancialData> = {}

    if (financialData.amount <= 0) {
      errors.amount = 'Amount must be greater than zero.'
    }

    if (financialData.description.trim() === '') {
      errors.description = 'Please enter a description.'
    }

    if (!financialData.spendingTime) {
      errors.spendingTime = 'Please select the investment time.'
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors({})

    // Make the API call to submit the data
    const userId = 'X2GE989qgBdlp2ESSrXWi3Cn4Au1' // Replace with the actual user ID
    axios
      .get('http://127.0.0.1:8080/finance', {
        headers: {
          userId: userId,
        },
      })
      .then((response) => {
        const userData = response.data
        // Handle the user data retrieved from the server if needed

        const requestData = {
          ...financialData,
          spendingTime: financialData.spendingTime
            ? Math.floor(financialData.spendingTime.getTime() / 1000)
            : null, // Convert to UNIX timestamp in seconds
        }

        axios
          .post('http://127.0.0.1:8080/finance', requestData, {
            headers: {
              userId: userId,
            },
          })
          .then((response) => {
            // Handle the response from the server after submitting financial data
            console.log(response.data)
            // Reset the form after successful submission
            resetForm()
          })
          .catch((error) => {
            // Handle any errors during the request
            console.error(error)
          })
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error(error)
      })
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="amount">Spent Amount</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={financialData.amount}
            onChange={handleChange}
            invalid={!!validationErrors.amount}
          />
          {validationErrors.amount && <p>{validationErrors.amount}</p>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={financialData.description}
            onChange={handleChange}
            invalid={!!validationErrors.description}
          />
          {validationErrors.description && <p>{validationErrors.description}</p>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="spendingTime">Time</Label>
          <DatePicker
            id="spendingTime"
            name="spendingTime"
            selected={financialData.spendingTime}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select a date"
            customInput={<DatePickerInput />}
          />
          {validationErrors.spendingTime && <p>{validationErrors.spendingTime}</p>}
        </FormGroup>

        <Button type="submit">Submit</Button>
      </FormContainer>
    </Container>
  )
}

export default FinanceForm
