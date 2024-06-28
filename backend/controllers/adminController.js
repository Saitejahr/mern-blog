const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Handle admin login
exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Error logging in admin:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Handle admin registration
exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingAdmin = await Admin.findOne({ username })

    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const admin = new Admin({ username, password })
    await admin.save()

    res.status(201).json({ message: 'Admin registered successfully' })
  } catch (error) {
    console.error('Error registering admin:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.logout = async (req,res) => {
  res.status(200).json({message: 'Logged out successfully'})
}
