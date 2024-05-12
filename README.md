# Store Product Management

This repository is a **REST API** that shows how to implement a Store for Product Management using [Express](https://expressjs.com/), [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) and a [SQLite](https://www.sqlite.org/) database file, Users authentication and authorization are also implemented 

## Getting started

### 1. Download the repository and install dependencies

Download this repository:

```
git clone https://github.com/samysellami/store.git
```

Install npm dependencies:
```
cd store
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Product` tables

```
npx prisma migrate dev --name init
```

When this command is executed against a newly created database, seeding is also triggered.  The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the admin user (<strong>email:</strong> admin@admin.com,  <strong>password:</strong> admin).


### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests, e.g. [`http://localhost:3000/api/users/login`](http://localhost:3000/api/users/login).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/api/products/:id`: Fetch a single product by its `id`
- `/api/products?category={category}&orderBy={orderBy}`: Fetch all products
  - Query Parameters
    - `category` (optional): This filters products by `category`
    - `orderBy` (optional): This sort products by price in either ascending or descending order. The value can either `asc` or `desc`
- `/api/users/:email`: Fetch users by their `email`
- `/api/users`: Fetch all users

### `POST`
- `/api/products`: Create a new product
  - Body:
    - `name: String` (required): The name of the product
    - `description: String` (required): The description of the product
    - `price: Int` (required): The price of the product
    - `category: String` (required): The category of the product
    - `image: String` (required): The path to the image of the product

- `/api/users/signup`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `password: String` (required): The password of the user
    - `name: String` (optional): The name of the user
- `/api/users/login`: Login a user
  - Body:
    - `email: String` (required): The email address of the user
    - `password: String` (required): The password of the user
- `/api/users/logout`: Logout the current user

### `PUT`

- `/api/products/:id`: Edit a product by its `id`
  - Body:
    - `name: String` (required): The name of the product
    - `description: String` (required): The description of the product
    - `price: Int` (required): The price of the product
    - `category: String` (required): The category of the product
    - `image: String` (required): The path to the image of the product

### `DELETE`

- `/api/products/:id`: Delete a product by its `id`
- `/api/users/:id`: Delete a user by its `id`

Note: A postman collection of sample requests are attached to this repository