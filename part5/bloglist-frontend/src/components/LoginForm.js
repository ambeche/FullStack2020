import React, { useState } from 'react'
import Button from './Button'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input
              onChange={handleUsernameChange}
              value={username}
              type="text"
              name="username"
              autoComplete="username"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              onChange={handlePasswordChange}
              value={password}
              type="password"
              name="password"
              autoComplete="currnt-password"
            />
          </label>
        </div>
        <Button label='log in' color='green'/>
      </form>
    </>
  )
}

export default LoginForm
