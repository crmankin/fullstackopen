import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification(exception.response.data.error || "No", "error", 5000);
    }


  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label htmlFor="Username">Username:</label> <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /><br />
      <label htmlFor="Password">Password:</label> <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /><br />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm;
