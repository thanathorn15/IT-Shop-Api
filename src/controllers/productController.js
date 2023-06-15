const {Product} = require('../models')

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
//         if (!req.file && (!req.body.message || !req.body.message.trim())) {
//           createError('message or image is required', 400);
//         }
    
//         const value = {
//           userId: req.user.id
//         };
    
//         if (req.body.message && req.body.message.trim()) {
//           value.message = req.body.message.trim();
//         }
    
//       if (req.file) {
//         const result = await uploadService.upload(req.file.path);
//         value.image = result.secure_url;
//       }
  
//       const post = await Post.create(value);
//       res.status(201).json({ post: post });
//     } catch (err) {
//       next(err);
//     } finally {
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }
//     }
//   };