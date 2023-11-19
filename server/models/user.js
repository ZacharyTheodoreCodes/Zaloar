"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Username can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Username can't be empty`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email should be unique",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: `Email can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Email can't be empty`,
          },
          isEmail: {
            args: true,
            msg: `Email format is incorrect`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Password can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Password can't be empty`,
          },
          len: {
            args: [5],
            msg: `Password must be at least 5 characters`,
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Phone Number can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Phone Number can't be empty`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Address can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Address can't be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          user.role = "Admin";
        },
      },
    }
  );
  return User;
};
