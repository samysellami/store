const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST PRODUCT. */
exports.create = async function (req, res) {
  const { name, description, price, category, image } = req.body
  try{
    const result = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        image,
      },
    })
    res.status(201).json(result)
  } catch(error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
  
}

/* GET PRODUCT. */
exports.get = async function (req, res) {
  const { id } = req.params

  try {
    const result = await prisma.product.findUnique({
      where: { id: Number(id) },
    })
    res.status(200).json(result)
  } catch(error) {
    console.error(`Product with ID ${id} does not exist in the database:`, error)
    res.status(500).json({ error: `Product with ID ${id} does not exist in the database` })
  }

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
    console.error(`Product with ID ${id} does not exist in the database`, error)
    res.json({ error: `Product with ID ${id} does not exist in the database` })
  }
}

/* GET PRODUCTS. */
exports.list = async function (req, res) {
  const { category, orderBy } = req.query

  const filter = category
    ? {
        OR: [
          { category: { contains: category } },
        ],
      }
    : {}
  try{
    const result = await prisma.product.findMany({
      where: {
        ...filter,
      },
      orderBy: {
        price: orderBy || undefined,
      },
    })
  } catch(error) {
    console.error(`Error: cannot retreive the list of products`, error)
    res.json({ error: `Error: cannot retreive the list of products` })
  }


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
    console.log(`Product with ID ${id} does not exist in the database`, error)
    res.json({ error: `Product with ID ${id} does not exist in the database` })
  }
}
