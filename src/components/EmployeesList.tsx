import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypesSelector'
import { fetchEmployees } from '../redux/employees/employees.actions'
import { useAppDispatch } from '../redux/store'
import EmployeeCard from './EmployeeCard'
import styles from './EmployeesList.module.scss'
import Loader from './Loader'

const EmployeesList = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { employees } = useTypedSelector(state => state.employees)

	const onCardClick = (id: number) => {
		navigate(`/employees/${id}`)
	}

	useEffect(() => {
		if (!employees.length) dispatch(fetchEmployees())
	}, [])

	if (!employees.length)
		return (
			<div className={styles.loaderContainer}>
				<Loader />
			</div>
		)

	return (
		<div className={styles.container}>
			{employees?.map(employee => (
				<EmployeeCard
					onCardClick={() => onCardClick(employee.id)}
					key={employee.id}
					name={employee.name}
					role={employee.role}
					phone={employee.phone}
					isArchive={employee.isArchive}
				/>
			))}
		</div>
	)
}

export default EmployeesList
