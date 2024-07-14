import { FC } from 'react'
import styles from './SideBar.module.scss'
import { useActions } from '../hooks/useActions'
import { RoleFilter, SortFilter } from '../types/employee.types'
import { useTypedSelector } from '../hooks/useTypesSelector'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

const SideBar: FC = () => {
	const navigate = useNavigate()

	const { filters } = useTypedSelector(state => state.employees)
	const { sortBy, role, isArchive } = filters
	const { collectFilters, filterEmployees, resetFilters } = useActions()

	const onCreateButtonClick = () => {
		navigate('/employees/new')
	}

	return (
		<div className={styles.container}>
			<h1>Employees App</h1>
			<div className={styles.filters}>
				<h3>Сортировать по:</h3>
				<select value={sortBy} onChange={e => collectFilters({ ...filters, sortBy: e.target.value as SortFilter })}>
					<option value='name'>имени</option>
					<option value='birthday'>дате рождения</option>
				</select>
				<h3>Фильтры:</h3>
				<label htmlFor='filter-role'>Должность</label>
				<select
					value={role}
					name='filter-role'
					id='filter-role'
					onChange={e => collectFilters({ ...filters, role: e.target.value as RoleFilter })}
				>
					<option value='all'>Все</option>
					<option value='waiter'>Официант</option>
					<option value='driver'>Водитель</option>
					<option value='cook'>Повар</option>
				</select>
				<div className={styles.checkbox}>
					<label htmlFor='isArchiveFilter'>В архиве:</label>
					<input
						checked={isArchive}
						type='checkbox'
						id='isArchiveFilter'
						onChange={e => collectFilters({ ...filters, isArchive: e.target.checked })}
					/>
				</div>
				<div className={styles.buttons}>
					<button className={styles.button} onClick={() => filterEmployees()}>
						Показать
					</button>
					<button className={styles.button} onClick={() => resetFilters()}>
						Сбросить
					</button>
				</div>
			</div>
			<button onClick={onCreateButtonClick} className={classNames(styles.button, styles.createButton)}>
				Добавить сотрудника
			</button>
		</div>
	)
}

export default SideBar
