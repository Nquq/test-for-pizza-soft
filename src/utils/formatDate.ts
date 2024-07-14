export const formatDate = (date: string) => {
	if (!date) return
	const [day, month, year] = date.split('.')
	return `${year}-${month}-${day}`
}
