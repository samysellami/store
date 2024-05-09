var express = require('express');
var router = express.Router();

var user = require('./users');
var product = require('./products');

/* POST USER. */
router.post(`/users/signup`, user.create)

/* GET USERS. */
router.get('/users/', user.list)



/* POST PRODUCT. */
router.post(`/products`, product.create)

/* GET PRODUCTS. */
router.get('/products', product.list)

/* GET PRODUCTS. */
app.get(`/post/:id`, product.edit)

module.exports = router;