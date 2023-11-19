"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name can't be empty",
          },
          notNull: {
            args: true,
            msg: "Name can't be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description can't be empty",
          },
          notNull: {
            args: true,
            msg: "Description can't be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price can't be empty",
          },
          notNull: {
            args: true,
            msg: "Price can't be empty",
          },
          min: {
            args: 5000,
            msg: "Minimum price is 5000",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock can't be empty",
          },
          notEmpty: {
            msg: "Stock can't be empty",
          },
          min: {
            args: 1,
            msg: "Minimum Stock is 0",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "ImageURL can't be empty",
          },
          notNull: {
            args: true,
            msg: "ImageURL can't be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category can't be empty",
          },
          notEmpty: {
            msg: "Category can't be empty",
          },
        },
      },
      authorId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
