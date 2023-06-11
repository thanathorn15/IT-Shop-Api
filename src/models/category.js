module.exports = (sequelize,DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
       
    },
    {
        underscored: true
    })
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: {
                name: "categoryId",
                allowNull: false,
              },
              onDelete: 'RESTRICT'
        })
    }

    return Category
}