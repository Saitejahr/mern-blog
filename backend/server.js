const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/postRoutes')
const adminRoutes = require('./routes/adminRoutes')
const path = require('path')
require('dotenv').config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api', postRoutes)
app.use('/api/admin', adminRoutes)


// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
