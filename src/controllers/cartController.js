const { Cart } = require("../models");
const { Product } = require("../models");
const { User } = require("../models");

exports.getCart = async (req, res, next) => {
  try {
    const rs = await Cart.findAll({});
    res.json(rs);
  } catch (err) {
    next(err);
  }
};

exports.getCartByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rs = await Cart.findAll({
      include: [
        { model: User, where: { id: id }, attributes: ["id"] },
        { model: Product },
      ],
    });
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.createCart = async (req, res, next) => {
  try {
  const {userId } = req.body;
  const rs = await Cart.create(req.body);
  res.json(rs);
  } catch (err) {
  next(err);
  }
  };