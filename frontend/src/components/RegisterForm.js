import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './styles/RegisterForm.css'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:5001/api/admin/register',
        {
          username,
          password,
        }
      )

      setMessage(response.data.message)
      setUsername('')
      setPassword('')
      toast.success('User registered successfully!')
      navigate('/admin/login')
    } catch (error) {
      setMessage(error.response?.data.message || 'Registration failed')
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
