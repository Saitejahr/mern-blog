import React, { useState } from 'react'
import axios from 'axios'
import './styles/LoginForm.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:5001/api/admin/login',
        {
          username,
          password,
        }
      )

      // Retrieve token from response
      const token = response.data.token

      // Store token in local storage
      localStorage.setItem('token', token)

      // Set token as authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Clear form fields and error message
      setUsername('')
      setPassword('')
      setError('')
      toast.success('User logged in successfully!')
      navigate('/bloglist')
    } catch (error) {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
