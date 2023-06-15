const { Cart } = require("../models");

exports.getCart = (req, res, next) => {
  Cart.findAll({})
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

// exports.getCartById = (req, res, next) => {
//   const { id } = req.user;
//   console.log(id);
//   Cart.findOne({
//     attributes: ["quantity", "price", "userId", "productId"],
//     where: { userId: id },
//   })
//     .then((rs) => {
//       console.log(rs);
//       res.json(rs);
//     })
//     .catch(next);
// };

exports.createCart = (req, res, next) => {
  const { quantity, price, userId, productId } = req.body;
  Cart.create(req.body)
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};
