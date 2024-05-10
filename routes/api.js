var express = require('express')
var router = express.Router()
const auth = require('../auth/auth')

var user = require('./users')
var product = require('./products')

/* USER OPERATIONS. */
/* REGISTER USER. */
router.post(`/users/signup`, user.register)

/* LOGIN USER. */
router.post(`/users/login`, user.login)

/* LOGOUT USER. */
router.post(`/users/logout`, user.logout)

/* GET USER BY EMAIL. */
router.get('/users/:email', auth.isAdminUser, user.getByEmail)

/* GET USERS. */
router.get('/users/', auth.isAdminUser, user.list)

/* DELETE USER. */
router.delete(`/users/:id`, auth.isAdminUser, user.delete)

/* PRODUCT OPERATIONS. */
/* POST PRODUCT. */
router.post(`/products`, auth.isAdminUser, product.create)

/* GET PRODUCTS. */
router.get('/products', product.list)

/* GET PRODUCT. */
router.get(`/products/:id`, product.get)

/* EDIT PRODUCT. */
router.put(`/products/:id`, auth.isAdminUser, product.edit)
module.exports = router

/* DELETE PRODUCT. */
router.delete(`/products/:id`, auth.isAdminUser, product.delete)

module.exports = router
