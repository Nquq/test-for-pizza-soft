import React from 'react'
import styles from './NotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate()

	const onBackButtonClick = () => {
		navigate('/')
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Страница не найдена</h1>
			<button className={styles.button} onClick={onBackButtonClick}>
				Вернуться на главную
			</button>
		</div>
	)
}

export default NotFoundPage
