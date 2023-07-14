const express = require('express')
const router = express.Router()
const upload = require("../middlewares/upload");

const orderController = require('../controllers/orderController')

router.patch("/updateOrder/:id",upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),orderController.updateOrder);
router.get('/getorder',orderController.getOrder)
router.get('/:id',orderController.getOrderByUserId)
router.get('/:id',orderController.getOrderByUserId)
router.post('/addorder',orderController.createOrder)


module.exports = router