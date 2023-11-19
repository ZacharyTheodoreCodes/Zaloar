"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
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
            msg: `Email can't be null`,
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
            msg: `Password can't be null`,
          },
          len: {
            args: [5],
            msg: `Password must be at least 5 characters`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Customer",
        validate: {
          notEmpty: {
            args: true,
            msg: `Role can't be empty`,
          },
          notNull: {
            args: true,
            msg: `Role can't be null`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
      hooks: {
        beforeCreate: (customer) => {
          customer.password = hashPassword(customer.password);
          customer.role = "Customer";
        },
      },
    }
  );
  return Customer;
};
