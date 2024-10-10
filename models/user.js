'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Profile, {foreignKey: "ProfileId"})
      User.hasMany(models.UserProduct, {foreignKey: "UserId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already existed" 
      },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid Email Format"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [8],
          msg: "Password must be at least 8 characters long"
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "buyer",
      validate: {
        notNull: {
          msg: "Role is required"
        },
        notEmpty: {
          msg: "Role is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // hooks: {
    //   beforeCreate: async(user) => {
    //     if(user.password) {
    //       user.password = await bcrypt.hashSync('bacon', 8);
    //     }
    //   }
    // }
  });

  // User.addHook('beforeCreate', (user) =>{
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(user.password, salt);

  //   user.password = hash
  // })

  return User;
};