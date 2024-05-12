const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST PRODUCT. */
exports.create = async function (req, res) {
  const { name, description, price, category, image } = req.body
  try {
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
  } catch (error) {
    const errorMessage = `Error creating product ${name}:`
    console.error(errorMessage, error)
    res.status(500).json({ error: errorMessage })
  }
}

/* GET PRODUCT. */
exports.get = async function (req, res) {
  const { id } = req.params

  try {
    const result = await prisma.product.findUnique({
      where: { id: Number(id) },
    })
    if (result == null) {
      throw new Error()
    }
    res.status(200).json(result)
  } catch (error) {
    const errorMessage = `Error: Product with ID ${id} does not exist in the database`
    console.error(errorMessage, error)
    res.status(500).json({ error: errorMessage })
  }
}

/* EDIT PRODUCT. */
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
    const errorMessage = `Error: Product with ID ${id} does not exist in the database`
    console.error(errorMessage, error)
    res.json({ error: errorMessage })
  }
}

/* GET PRODUCTS. */
exports.list = async function (req, res) {
  const { category, orderBy } = req.query

  const filter = category
    ? {
        OR: [{ category: { contains: category } }],
      }
    : {}
  try {
    const result = await prisma.product.findMany({
      where: {
        ...filter,
      },
      orderBy: {
        price: orderBy || undefined,
      },
    })
    res.status(200).json(result)
  } catch (error) {
    const errorMessage = `Error: cannot retreive the list of products`
    console.error(errorMessage, error)
    res.json({ error: errorMessage })
  }
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
    res.json({ success: `Product with ID ${id} successfully deleted from the database` })
  } catch (error) {
    const errorMessage = `Error: Product with ID ${id} does not exist in the database`
    console.log(errorMessage, error)
    res.json({ error: errorMessage })
  }
}
