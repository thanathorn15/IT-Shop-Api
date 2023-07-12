const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')


router.get('/getcart',cartController.getCart)
router.get('/:id',cartController.getCartByUserId)
router.post('/addcart',cartController.createCart)


module.exports = router