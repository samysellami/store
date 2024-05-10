const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    name: 'admin',
    role: 'admin',
    hash: '/B2ujRn/fqhPBJpzRhkXx1FFlEZ4quAqmAMywb9Uocpx8ASS+AoA8fNtW06eNyWxI8O5tw1YjGfbqVMypxUYGNLbjnm7g/sQXjwl/tQIHjfZJfy39bermNTiscvIs+RVHiPJ1J0Kv5nScuxse+pivW6Mpq8MKLbl5qbhycuZ6ys=',
    salt: 'mInKAAtHCEmU/2kIQn9vuhhdcn6/K9Neu/4vfODoTpxQjqq85BGtP2PLKNZ9vrYAD6cfbEtRPRTiYFAmO+tmyg=='
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
