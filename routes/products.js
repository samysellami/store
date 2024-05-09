
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST PRODUCT. */
exports.create = async function(req, res){
  const { name, description, price, category, image } = req.body
  const result = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      image
    },
  })
  res.json(result)
}

exports.edit = async function  (req, res) {
  const { id } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
}

/* GET PRODUCTS. */
exports.list = async function(req, res){
  const users = await prisma.product.findMany()
  res.json(users)
}
