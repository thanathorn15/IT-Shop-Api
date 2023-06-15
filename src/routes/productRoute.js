const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { upload } = require('../middlewares/upload')


router.get('/getproduct',productController.getAllProducts)
router.get('/:id',productController.getProductById)
router.post('/addproduct',productController.createProduct)
router.put('/:id',productController.updateProduct)
router.delete('/:id',productController.deleteProduct)

// router.post('/',upload.single('image'),productController.createImage)

module.exports = router