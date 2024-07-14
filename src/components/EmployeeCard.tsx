import { FC } from 'react'
import styles from './EmployeeCard.module.scss'

type EmployeeCardProps = {
	name: string
	role: string
	phone: string
	isArchive: boolean
	onCardClick: () => void
}

type RuTitles = 'Официант' | 'Водитель' | 'Повар'

const ruTitles: Record<string, RuTitles> = {
	waiter: 'Официант',
	driver: 'Водитель',
	cook: 'Повар',
}

const EmployeeCard: FC<EmployeeCardProps> = ({ name, role, phone, isArchive, onCardClick }) => {
	return (
		<div onClick={onCardClick} className={styles.card}>
			<div className={styles.side}>?</div>
			<div className={styles.info}>
				<div>Имя - {name}</div>
				<div>Должность - {ruTitles[role]}</div>
				<div>Телефон - {phone}</div>
				{isArchive ? <div>В архиве</div> : null}
			</div>
		</div>
	)
}

export default EmployeeCard
