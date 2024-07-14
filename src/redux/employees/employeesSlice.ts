import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Employee } from '../../types/employee.types'
import { fetchEmployeeById, fetchEmployees } from './employees.actions'
import { formatDate } from '../../utils/formatDate'

type filters = {
	sortBy: 'name' | 'birthday'
	role: 'all' | 'waiter' | 'driver' | 'cook'
	isArchive: boolean
}

interface EmployeesState {
	employees: Employee[]
	selectedEmployee: Employee | null
	initialEmployees: Employee[]
	filters: filters
}

const initialState: EmployeesState = {
	employees: [],
	selectedEmployee: null,
	initialEmployees: [],
	filters: {
		sortBy: 'name',
		role: 'all',
		isArchive: false,
	},
}

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		addEmployee: (state, action: PayloadAction<Employee>) => {
			const newEmployee = { ...action.payload, id: state.initialEmployees.length + 1 }

			state.employees.push(newEmployee)
			state.initialEmployees.push(newEmployee)
			localStorage.setItem('employees', JSON.stringify(state.initialEmployees))
		},
		saveEmployee: (state, action: PayloadAction<Employee>) => {
			const findIndexForFiltered = state.employees.findIndex(employee => employee.id === action.payload?.id)
			const findIndexForInitial = state.initialEmployees.findIndex(employee => employee.id === action.payload?.id)

			state.selectedEmployee = action.payload
			state.employees[findIndexForFiltered] = action.payload
			state.initialEmployees[findIndexForInitial] = action.payload

			localStorage.setItem('employees', JSON.stringify(state.initialEmployees))
		},
		collectFilters: (state, action: PayloadAction<filters>) => {
			state.filters = action.payload
		},
		filterEmployees: state => {
			const { sortBy, role, isArchive } = state.filters

			const sortedEmployees = state.initialEmployees.sort((a, b) => {
				if (sortBy === 'name') {
					return a.name.localeCompare(b.name)
				} else {
					return new Date(formatDate(a.birthday) || '').getTime() - new Date(formatDate(b.birthday) || '').getTime()
				}
			})

			state.employees =
				role === 'all'
					? sortedEmployees.filter(employee => employee.isArchive === isArchive)
					: sortedEmployees.filter(employee => employee.isArchive === isArchive && employee.role === role)
		},
		resetFilters: state => {
			state.filters = {
				sortBy: 'name',
				role: 'all',
				isArchive: false,
			}
			state.employees = [...state.initialEmployees].filter(employee => !employee.isArchive)
		},
	},
	extraReducers: builder =>
		builder
			.addCase(fetchEmployees.fulfilled, (state, action) => {
				state.initialEmployees = [...action.payload]
				state.employees = [...action.payload.sort((a, b) => a.name.localeCompare(b.name))].filter(employee => !employee.isArchive)
				localStorage.setItem('employees', JSON.stringify(action.payload))
			})
			.addCase(fetchEmployeeById.pending, state => {
				state.selectedEmployee = null
			})
			.addCase(fetchEmployeeById.fulfilled, (state, action) => {
				state.selectedEmployee = state.employees.find(employee => employee.id === action.payload)!
			}),
})

export default employeesSlice.reducer
