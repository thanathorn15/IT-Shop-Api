const { Product } = require("../models");
const { User } = require("../models");
const { Order } = require("../models");
const { OrderItem } = require("../models");
const { Cart } = require("../models");
const uploadService = require("../services/uploadService");
const fs = require('fs')

exports.getOrder = async (req, res, next) => {
  try {
    const rs = await Order.findAll({});
    res.json(rs);
  } catch (err) {
    next(err);
  }
};

exports.getOrderByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rs = await Order.findAll({
      include: [
        { model: User, where: { id: id }, attributes: ["id"] },
        { model: OrderItem, include: Product },
      ],
    });
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const userId = req.user.id;
  const { address } = req.body;

  try {
    const cart = await Cart.findAll({
      where: {
        userId,
      },
      include: {
        model: Product,
      },
    });

    const modifyCart = JSON.parse(JSON.stringify(cart));

    const order = await Order.create({ userId, address, status: "pending" });

    for (let item of modifyCart) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product.price,
      });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};



exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rs = await uploadService.upload(req.files.image[0].path);
    console.log(rs.secure_url);
    const result = await Order.update(
      { paymentSlip: rs.secure_url },
      { where: { id } }
    );
    res.json(result);
  } catch (err) {
    next(err);
  } finally {
  if (req.files.image) {
    fs.unlinkSync(req.files.image[0].path);
  }
}
}
