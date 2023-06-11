module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   
  },
  {
    underscored: true
  }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: 'RESTRICT'
})

Product.hasMany(models.Cart, {
  foreignKey: {
      name: "productId",
      allowNull: false,
    },
    onDelete: 'RESTRICT'
})

Product.hasMany(models.OrderItem, {
  foreignKey: {
      name: "productId",
      allowNull: false,
    },
    onDelete: 'RESTRICT'
})
}


  return Product;
};
