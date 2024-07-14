import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { employeesSlice } from '../redux/employees/employeesSlice'

const allActions = {
	...employeesSlice.actions,
}

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
