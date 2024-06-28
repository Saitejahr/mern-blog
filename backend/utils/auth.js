const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}


// Middleware to check admin authentication
exports.checkAdminAuth = (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      next()
    }
  })
}
