'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProduct.belongsTo(models.User, {foreignKey: "UserId"})
      UserProduct.belongsTo(models.Product, {foreignKey: "ProductId"})
    }
  }
  UserProduct.init({
    name: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  return UserProduct;
};