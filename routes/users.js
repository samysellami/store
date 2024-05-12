const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('../auth/auth')
var hash = require('pbkdf2-password')()

/* REGISTER USER. */
exports.register = async function (req, res) {
  const { email, password, name } = req.body
  hash({ password: password }, async function (err, pass, salt, hash) {
    const role = 'guest'
    if (err) {
      console.error('Error hashing password:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
    try {
      const result = await prisma.user.create({
        data: {
          email,
          hash,
          salt,
          name,
          role,
        },
      })
      res.status(201).json({ success: `User ${name} successfully created` })
    } catch (error) {
      const errorMessage = `Error creating user ${name}`
      console.error(errorMessage, error)
      res.status(500).json({ error: errorMessage })
    }
  })
}

/* LOGIN USER. */
exports.login = async function (req, res, next) {
  auth.authenticate(req.body.email, req.body.password, function (err, user) {
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in to prevent fixation
      req.session.regenerate(function () {
        // Store user object in the session store
        req.session.user = user
        req.session.success = 'Authenticated as ' + user.name
        res.status(200).json({ success: `${req.session.success}` })
      })
    } else {
      req.session.error = 'Authentication failed, please check your ' + 'username and password.'
      console.error('Error: ', `${req.session.error}`)
      res.status(500).json({ error: `${req.session.error}` })
    }
  })
}

/* LOGOUT USER. */
exports.logout = async function (req, res, next) {
  // destroy the user's session to log them out
  const name = req.session.user ? (req.session.user.name ? req.session.user.name : '') : ''
  req.session.destroy(function () {
    res.status(200).json({ success: `User ${name} successfully logged out` })
  })
}

/* GET USERS. */
exports.list = async function (req, res) {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users.map(({ id, email, name }) => ({ id, email, name })))
  } catch (error) {
    const errorMessage = `Error: cannot retreive the list of users`
    console.error(errorMessage, error)
    res.status(500).json({ error: errorMessage })
  }
}

/* GET USER BY EMAIL. */
exports.getByEmail = async function (req, res) {
  const email = req.params.email

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    })
    const { id, name } = user
    res.status(200).json({ id, email, name })
  } catch (error) {
    const errorMessage = `Error: User with email ${email} does not exist in the database`
    console.error(errorMessage, error)
    res.status(500).json({ error: errorMessage })
  }
}

/* DELETE USER. */
exports.delete = async function (req, res) {
  const { id } = req.params
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })
    res.status(200).json({ success: `User with ID ${id} successfully deleted from the database}` })
  } catch (error) {
    const errorMessage = `Error: User with ID ${id} does not exist in the database`
    console.error(errorMessage, error)
    res.json({ error: errorMessage })
  }
}
