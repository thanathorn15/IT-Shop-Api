const {Product} = require('../models')

exports.getAllProducts = (req, res, next) => {
    Product.findAll({
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.getProductById = (req, res, next) => {
    const {id} = req.params
    Product.findOne({
        attributes: ['name', 'price', 'brand','detail','image','categoryId'],
        where : {id : id}
    }).then( rs => {
        res.json(rs)
    }).catch(next)
}

exports.createProduct = (req, res, next) => {

    const { name, price,brand,category,detail,image } = req.body
    Product.create(req.body).then(rs=> {
        res.json(rs)
    }).catch(next)

}

exports.updateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, price,brand,category,detail,image  } = req.body
    Product.update(
      { ...req.body, userId: req.user.id },
      {
        where: { id: id },
      }
    )
      .then((rs) => {
        res.json(rs);
      })
      .catch(next);
  };

  exports.deleteProduct = (req, res, next) => {
    const {id} = req.params
    Product.destroy({
        where : {id : id}
    }).then(rs=> {
        if (rs===0) {
            throw new Error('Cannot Delete!!')
        }
        res.json(rs)
    }).catch(next)
}