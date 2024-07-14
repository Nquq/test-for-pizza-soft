import { FC, ReactNode, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypesSelector'
import { fetchEmployeeById, fetchEmployees } from '../redux/employees/employees.actions'
import { useAppDispatch } from '../redux/store'
import { Employee } from '../types/employee.types'
import styles from './EmployeePage.module.scss'
import Loader from '../components/Loader'
import { formatDate } from '../utils/formatDate'
import { useActions } from '../hooks/useActions'
import classNames from 'classnames'
import InputMask from 'react-input-mask'

const EmployeePage: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { id } = useParams()
	const { selectedEmployee } = useTypedSelector(state => state.employees)
	const { saveEmployee, filterEmployees, addEmployee } = useActions()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ values: id ? ({ ...selectedEmployee, birthday: formatDate(selectedEmployee?.birthday ?? '') } as Employee) : undefined })

	const saveController = useRef<{ timeout: number; loading: boolean }>({ timeout: 0, loading: false })

	useEffect(() => {
		dispatch(fetchEmployees())
		if (id) dispatch(fetchEmployeeById(+id))
	}, [id])

	const onSubmit: SubmitHandler<Employee> = data => {
		console.log(data)
		const formattedDate = data.birthday?.split('-').reverse().join('.')

		if (saveController.current.loading) return
		saveController.current.loading = true

		saveController.current.timeout = setTimeout(() => {
			if (id) {
				saveEmployee({ ...data, birthday: formattedDate })
			} else {
				addEmployee({ ...data, birthday: formattedDate })
			}

			saveController.current.loading = false
			filterEmployees()
			!id ? navigate('/', { replace: true }) : null
		}, 1000)

		return () => clearTimeout(saveController.current?.timeout)
	}

	const onBackButtonClick = () => {
		navigate('/')
	}

	if (!selectedEmployee && id)
		return (
			<div className={styles.loaderContainer}>
				<Loader />
			</div>
		)

	return (
		<div className={styles.container}>
			<h1>{id ? 'Редактировать карточку сотрудника' : 'Добавить сотрудника'}</h1>
			<div className={styles.card}>
				<div className={styles.photoContainer}>
					<div className={styles.photo}>?</div>
				</div>
				<div>
					<form onReset={onBackButtonClick} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<label htmlFor='name'>Имя</label>
						<input {...register('name', { required: true })} placeholder='Введите имя' type='text' id='name' />
						{errors.name && <p className={styles.error}>Обязательное поле!</p>}

						<label htmlFor='phone'>Телефон</label>
						<InputMask
							mask={'+7 (999) 999-99-99'}
							placeholder='+7 (999) 999-99-99'
							defaultValue={id && selectedEmployee?.phone}
							autoComplete='off'
							{...register('phone', { required: true })}
							{...() => (<input type='tel' id='phone' />) as ReactNode}
						/>
						{errors.phone && <p className={styles.error}>Обязательное поле!</p>}

						<label htmlFor='birthday'>Дата рождения</label>
						<input
							{...register('birthday', {
								required: true,
							})}
							type='date'
							min='1900-01-01'
							id='birthday'
							max={new Date().toISOString().split('T')[0]}
						/>
						{errors.birthday && <p className={styles.error}>Обязательное поле!</p>}

						<label htmlFor='role'>Должность</label>
						<select {...register('role')} id='role'>
							<option value='waiter'>Официант</option>
							<option value='driver'>Водитель</option>
							<option value='cook'>Повар</option>
						</select>
						<div className={styles.checkbox}>
							<label htmlFor='isArchive'>В архиве:</label>
							<input type='checkbox' {...register('isArchive')} id='isArchive' />
						</div>
						<div className={styles.buttons}>
							<button
								disabled={saveController.current.loading}
								className={classNames(styles.button, saveController.current.loading && styles.disabledButton)}
								type='submit'
							>
								{saveController.current?.loading && !id
									? 'Создание...'
									: saveController.current.loading && id
									? 'Сохранение...'
									: id
									? 'Сохранить'
									: 'Создать'}
							</button>
							<button className={styles.button} type='reset'>
								Назад
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EmployeePage
