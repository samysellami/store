const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('../auth/auth')
var hash = require('pbkdf2-password')()

/* REGISTER USER. */
exports.register = async function (req, res) {
  const { email, password, name } = req.body
  hash({ password: password }, async function (err, pass, salt, hash) {
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
        },
      })
      res.status(201).json(`User ${name} successfully created`)
    } catch (error) {
      console.error(`Error creating user ${name}:`, error)
      res.status(500).json({ error: 'Internal server error' })
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
        // Store the user's primary key in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user
        req.session.success =
          'Authenticated as ' + user.name
        res.status(200).json({ success: `${req.session.success}` })
        // res.redirect('back');
      })
    } else {
      req.session.error = 'Authentication failed, please check your ' + ' username and password.'
      console.error('Error: ', `${req.session.error}`)
      res.status(500).json({ error: `${req.session.error}` })
      // res.redirect('/login');
    }
  })
}

/* LOGOUT USER. */
exports.logout = async function (req, res, next) {
  // destroy the user's session to log them out
  const name = req.session.user.name
  req.session.destroy(function () {
    res.status(200).json(`User ${name} successfully logged out`)
  })
}

/* GET USERS. */
exports.list = async function (req, res) {
  try{
    const users = await prisma.user.findMany()
    res.status(200).json(users.map(({ id, email, name }) => ({ id, email, name })))
  } catch(error) {
    console.error(`Error: cannot retreive the list of users:`, error)
    res.status(500).json({ error: 'Internal server error' })    
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
    res.status(200).json({id, email, name})
  } catch (error) {
    console.error(`User with email ${email} does not exist in the database:`, error)
    res.status(500).json({ error: 'Internal server error' })
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
    res.status(200).json(`User with ID ${id} deleted from the database`)
  } catch (error) {
    res.json({ error: `User with ID ${id} does not exist in the database` })
  }
}
