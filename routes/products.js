const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST PRODUCT. */
exports.create = async function (req, res) {
  const { name, description, price, category, image } = req.body
  const result = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      image,
    },
  })
  res.json(result)
}

/* GET PRODUCT. */
exports.get = async function (req, res) {
  const { id } = req.params

  const result = await prisma.product.findUnique({
    where: { id: Number(id) },
  })
  res.json(result)
}

exports.edit = async function (req, res) {
  const { id } = req.params
  const { name, description, price, category, image } = req.body

  try {
    const result = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        category,
        image,
      },
    })

    res.json(result)
  } catch (error) {
    res.json({ error: `Product with ID ${id} does not exist in the database` })
  }
}

/* GET PRODUCTS. */
exports.list = async function (req, res) {
  const result = await prisma.product.findMany()
  res.json(result)
}

/* DELETE PRODUCT. */
exports.delete = async function (req, res) {
  const { id } = req.params
  try {
    const result = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(`Product with ID ${id} deleted from the database`)
  } catch (error) {
    res.json({ error: `Product with ID ${id} does not exist in the database` })
  }
}
