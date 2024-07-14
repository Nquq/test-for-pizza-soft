import { EmployeesList, SideBar } from '../components'
import styles from './EmployeesPage.module.scss'

const EmployeesPage = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<EmployeesList />
		</div>
	)
}

export default EmployeesPage
