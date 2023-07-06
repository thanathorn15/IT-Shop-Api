const {Product} = require('../models')
const fs = require('fs')
const createError = require("../utils/createError");
const uploadService = require("../services/uploadService");

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

exports.createProduct = async (req, res, next) => {
    // const {name} = req.body
   await Product.create(req.body)
    .then(rs=> {
        res.json(rs)
    }).catch(next)

}


// exports.createProduct = async (req, res, next) => {
//     try {
//       await Product.create(req.body);
  
//       if (req.file) {
//         const result = await uploadService.upload(req.file.path);
//         value.image = result.secure_url;
//         fs.unlinkSync(req.file.path); 
//       }
  
//       res.status(201).json(value);
//     } catch (err) {
//       next(err);
//     }
//   };

exports.updateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, price,brand,category,detail,image  } = req.body
    Product.update(
       {...req.body},  
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
            throw new Error('Cannot Delete')
        }
        res.json(rs)
    }).catch(next)
}

// exports.createImage = async (req, res, next) => {
//     try {
//         if (!req.file) {
//           createError('image is required', 400);
//         }
    
//         const value = {
//           productId: req.product.id
//         };
    
//         if (req.body.message && req.body.message.trim()) {
//           value.message = req.body.message.trim();
//         }
    
//       if (req.file) {
//         const result = await uploadService.upload(req.file.path);
//         value.image = result.secure_url;
//       }
  
//       const product = await Product.create(value);
//       res.status(201).json({ id: id });
//     } catch (err) {
//       next(err);
//     } finally {
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }
//     }
//   };