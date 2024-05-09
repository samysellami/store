
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST USER. */

exports.create = async function(req, res){
  const { email, password, name } = req.body

  const result = await prisma.user.create({
    data: {
      email,
      password,
      name
    },
  })
  res.json(result)
}

/* GET USERS. */
exports.list = async function(req, res){
  const users = await prisma.user.findMany()
  res.json(users)
}
