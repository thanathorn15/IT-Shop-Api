module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9]{10}$/
            }
        },
        role: {
            type:DataTypes.ENUM('admin','user'),
            // allowNull: false,
            defaultValue: 'user'
            
           
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            // allowNull: false,
           
        },
        
       
    
    },
    {
        underscored: true
    }
    )
User.associate = (models) => {

    User.hasMany(models.Cart, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        },
        onDelete: 'RESTRICT'
    })
    User.hasMany(models.Order, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        },
        onDelete: 'RESTRICT'
    })
   
}

    return User
}