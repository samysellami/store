'use strict'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

var hash = require('pbkdf2-password')()

// Authenticatication
exports.authenticate = async function authenticate(email, password, fn) {
  if (!module.parent) console.log('authenticating %s:%s', email, password)
  // query the db for the given username
  const user = await prisma.user.findUnique({
    where: {
      email: String(email),
    },
  })

  if (!user) return fn(null, null)
  // applying the hash against the pass / salt, if there is a match we found the user
  hash({ password: password, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err)
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  })
}

exports.isAdminUser = function restrict(req, res, next) {
  const role = req.session.user ? (req.session.user.role ? req.session.user.role : '') : ''
  if (role == 'admin') {
    next()
  } else {
    req.session.error = 'Access denied! This endpoint is retricted to the admin user'
    res.status(403).json({ error: `${req.session.error}` })
  }
}
