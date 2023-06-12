const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')


router.get('/getproduct',productController.getAllProducts)
router.get('/:id',productController.getProductById)
router.post('/addproduct',productController.createProduct)
router.put('/:id',productController.updateProduct)
router.delete('/:id',productController.deleteProduct)

module.exports = router