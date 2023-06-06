module.exports = (sequelize, DataTypes) => {

    const Products = sequelize.define(
      "Products",
      {
        name:{ 
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
  
      },
     
      {
        underscored: true,
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
      });
  
      Comment.belongsTo(models.Post, {
          foreignKey: {
            name: "postId",
            allowNull: false,
          },
          onDelete: "RESTRICT",
        });
  
      };
      return Comment;
  };
  