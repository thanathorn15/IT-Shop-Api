module.exports = (sequelize,DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        quantity: {
            type:DataTypes.INTEGER,
            allowNull:false
           },    
        price: {
             type:DataTypes.DECIMAL,
             allowNull:false
            },
            
        
       
    
    },
    {
        underscored: true
    }
    )

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
          foreignKey: {
            name: "orderId",
            allowNull: false,
          },
          onDelete: 'RESTRICT'
    })

    OrderItem.belongsTo(models.Product, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: 'RESTRICT'
  })
    }
    return OrderItem
}