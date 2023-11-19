const { Product, Category, User, History } = require("../models");

class adminController {
  static async getAllProducts(req, res, next) {
    try {
      //product controller
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }

  static async postProduct(req, res, next) {
    try {
      const newProduct = await Product.create({
        ...req.body,
        authorId: req.user.id,
      });

      await History.create({
        title: req.body.name,
        description: `new entity with id ${newProduct.id} created `,
        updatedBy: req.user.username,
      });
      res.status(201).json({ newProduct });
    } catch (err) {
      next(err);
    }
  }

  static async getOneProduct(req, res, next) {
    try {
      const productById = await Product.findOne({
        where: { id: req.params.id },
      });
      if (!productById) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ productById });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOneProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      await Product.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: `${product.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async replaceProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (!product) throw { name: "NotFound" };

      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      product.name = name;
      product.description = description;
      product.price = price;
      product.stock = stock;
      product.imgUrl = imgUrl;
      product.categoryId = +categoryId;

      await product.save();
      await History.create({
        title: name,
        description: `Product with id ${req.params.id} updated`,
        updatedBy: req.user.username,
      });
      res
        .status(200)
        .json({ message: `${product.name} has been edited successfully` });
    } catch (err) {
      next(err);
    }
  }

  static async modifyProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (!product) throw { name: "NotFound" };

      const previousStatus = product.status;
      //{status} = req.body

      product.status = req.body.status;
      await product.save();
      await History.create({
        title: product.name,
        description: `Product status with id ${product.id} has been updated from ${previousStatus} to ${product.status}`,
        updatedBy: req.user.username,
      });
      res.status(200).json({
        message: `${product.name} status has been modified`,
      });
    } catch (err) {
      next(err);
    }
  }

  // Category controller
  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [["id", "ASC"]] });
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const newCategory = await Category.create({ ...req.body });
      res.status(201).json({ newCategory });
    } catch (err) {
      next(err);
    }
  }
  static async replaceCategory(req, res, next) {
    try {
      const category = await Category.findOne({ where: { id: req.params.id } });
      if (!category) throw { name: "NotFound" };
      const { name } = req.body;
      category.name = name;
      await category.save();
      res.status(200).json({ message: `${category.name} success to edit` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findOne({ where: { id: req.params.id } });
      await Category.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: `${category.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  // History controller
  static async getHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ histories });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = adminController;
