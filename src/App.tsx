import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { EmployeePage, EmployeesPage, NotFoundPage } from './pages'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='*' element={<NotFoundPage />} />
				<Route path='/' element={<EmployeesPage />} />
				<Route path='/employees/:id' element={<EmployeePage />} />
				<Route path='/employees/new' element={<EmployeePage />} />
			</Routes>
		</Router>
	)
}

export default App
