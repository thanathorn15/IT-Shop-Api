module.exports = (sequelize,DataTypes) => {
    const Cart = sequelize.define('Cart', {
        quantity: {
            type:DataTypes.INTEGER,
            allowNull:false
           },    
        price: {
             type:DataTypes.DECIMAL,
             allowNull:false
            },
           
    
    }, {

        underscored: true
    });
Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
          },
          onDelete: 'CASCADE'
    })

    Cart.belongsTo(models.Product, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: 'CASCADE'
  })
}

    return Cart
}