'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Product.hasMany(models.UserProduct, {foreignKey: "ProductId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Name is required"
        },
        notEmpty: {
          msg: "Product Name is required"
        },
      }      
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Description is required"
        },
        notEmpty: {
          msg: "Product Description is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Price has to be filled"
        },
        notEmpty: {
          msg: "Product Price has to be filled"
        },
        min: {
          args: 1000,
        }
      }
    }   
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};