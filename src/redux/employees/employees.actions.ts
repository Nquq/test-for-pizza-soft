import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import defaultEmployees from '../../data/employees.json'
import { Employee } from '../../types/employee.types'

export const fetchEmployees: AsyncThunk<Employee[], void, { rejectValue: unknown }> = createAsyncThunk(
	'employees/fetchEmployees',
	async (_, { rejectWithValue }) => {
		try {
			const employeesFromLocalStorage = localStorage.getItem('employees')
			const fakeResponse: Employee[] = await new Promise(resolve =>
				setTimeout(() => resolve(employeesFromLocalStorage ? JSON.parse(employeesFromLocalStorage) : defaultEmployees), 1000)
			)

			return fakeResponse
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const fetchEmployeeById: AsyncThunk<number, number, { rejectValue: unknown }> = createAsyncThunk(
	'employees/fetchEmployeeById',
	async (id, { rejectWithValue }) => {
		try {
			const fakeResponse: number = await new Promise(resolve => setTimeout(() => resolve(id), 1000))

			return fakeResponse
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
