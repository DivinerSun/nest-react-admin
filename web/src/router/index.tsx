import { BrowserRouter, useRoutes } from 'react-router-dom'
import AuthRouter from './auth'
import { routes } from './routes'

const AppRouter = () => {
  const Router = () => useRoutes(routes)
  return (
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  )
}

export default AppRouter
