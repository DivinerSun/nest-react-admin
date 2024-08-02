import { Button } from 'antd'

const Login = () => {
  const handleLogin = () => {
    window.localStorage.setItem('token', Date.now().toString())
  }

  return (
    <div className="login">
      <p>This's Login Page</p>
      <Button type="primary" onClick={handleLogin}>
        登录
      </Button>
    </div>
  )
}

export default Login
