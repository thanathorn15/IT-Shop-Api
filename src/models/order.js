module.exports = (sequelize,DataTypes) => {
    const Order = sequelize.define('Order', {
        date: {
            type:DataTypes.DATE,
            allowNull:false
           },    
        status: {
             type:DataTypes.ENUM('PENDING','ACCEPTED','WAITING','SUCCESS'),
             allowNull:false
            },
       
    },
    {
        underscored: true
    }
    )

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
              },
              onDelete: 'RESTRICT'
        })


        Order.hasMany(models.OrderItem, {
            foreignKey: {
                name: "orderId",
                allowNull: false,
              },
              onDelete: 'RESTRICT'
        })
        
    }

    return Order
}