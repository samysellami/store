var express = require('express')
var router = express.Router()

var user = require('./users')
var product = require('./products')

/* POST USER. */
router.post(`/users/signup`, user.create)

/* GET USERS. */
router.get('/users/', user.list)

/* POST PRODUCT. */
router.post(`/products`, product.create)

/* GET PRODUCTS. */
router.get('/products', product.list)

/* GET PRODUCT. */
router.get(`/products/:id`, product.get)

/* EDIT PRODUCT. */
router.put(`/products/:id`, product.edit)
module.exports = router

/* DELETE PRODUCT. */
router.delete(`/products/:id`, product.delete)

module.exports = router
