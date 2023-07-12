 const {Product} = require('../models')
const fs = require('fs')
const createError = require("../utils/createError");
const uploadService = require("../services/uploadService");

exports.getAllProducts = async (req, res, next) => {
  try {
  const rs = await Product.findAll();
  res.json(rs);
  } catch (err) {
  next(err);
  }
  };

exports.getProductById = async (req,res,next) => {
try {
  const {id} = req.params
  const rs = await Product.findOne({
    attributes: ['name', 'price', 'brand','detail','image','categoryId'],
    where : {id : id}
  });
  res.json(rs)
}catch(err) {
  next(err)
}
}

exports.createProduct = async (req, res, next) => {
   try {
    const {name} = req.body
 const rs = await Product.create(req.body)
    res.json(rs)
 
   }catch(err) {
    next(err)
   }
}
  exports.updateProduct = async (req, res, next) => {
    try {
    const { id } = req.params;
    const { name } = req.body;
    const rs = await Product.update(
      { ...req.body },
      {
        where: { id: id },
      }
    );
    
    res.json(rs);
  } catch (err) {
    next(err);
    }
    };
    

exports.deleteProduct = async (req, res, next) => {
  try {
  const { id } = req.params;
  const rs = await Product.destroy({
  where: { id: id },
  });
  if (rs === 0) {
    throw new Error('Cannot Delete');
  }
  
  res.json(rs);

} catch (err) {
  next(err);
  }
  };

exports.uploadImage = async (req, res, next) => {
    const {productId} = req.params

    try {
      if (!req.files.image ) {
        createError(" image  is require");
      }
      const product = await Product.findOne({where: {id: productId }})
      const modify = JSON.parse(JSON.stringify(product)) 
      const updateValue = {...modify};
      if (req.files.image) {
        console.log(req.files.image[0].path)
        const result = await uploadService.upload(req.files.image[0].path);
        updateValue.image = result.secure_url;
      }

     console.log(updateValue);
      await Product.update(updateValue , { where: { id: productId } });
      res.status(200).json(updateValue);
    } catch (err) {
      next(err);
    } finally {
      if (req.files.image) {
        fs.unlinkSync(req.files.image[0].path);
      }
    }
  };