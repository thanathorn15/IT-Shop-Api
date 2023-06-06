module.exports = (sequelize,DataTypes) => {
    const Order = sequelize.define('Order', {
            status: {
             type:DataTypes.ENUM('PENDING','SUCCESS'),
             allowNull:false
            },
            
        
        underscored: true
    
    })

    return User
}