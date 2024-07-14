export interface Employee {
	id: number
	name: string
	isArchive: boolean
	role: string
	phone: string
	birthday: string
}

export type RoleFilter = 'all' | 'waiter' | 'driver' | 'cook'
export type SortFilter = 'name' | 'birthday'