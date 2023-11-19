const { Product, Category, Bookmark, Customer } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { pagination } = require("../helpers/pagination");

class publicController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      console.log(req.body);
      const customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        throw { name: "InvalidEmail/Password" };
      }
      console.log(customer);
      const isPasswordValid = comparePassword(password, customer.password);
      if (!isPasswordValid) {
        throw { name: "InvalidEmail/Password" };
      }

      const access_token = signToken({ id: customer.id });
      res.status(200).json({
        access_token,
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const customer = await Customer.create(req.body);
      res.status(201).json({
        message: `Register success`,
        customer,
      });
    } catch (err) {
      next(err);
    }
  }
  static async googleSignIn(req, res, next) {
    try {
      const { token_google } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: Math.random() * 10,
        },
        hooks: false,
      });

      const access_token = signToken({ id: user.id });

      res.status(200).json({
        access_token,
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const itemPerPage = 8;
      const { page, name, categoryId } = req.query;

      //pagination
      let limit, offset;
      if (page) {
        const { limit: pageLimit, offset: pageOffset } = pagination(
          page - 1,
          itemPerPage
        );
        limit = pageLimit;
        offset = pageOffset;
      } else {
        limit = undefined;
        offset = undefined;
      }

      //filter by name and/or category
      let option = {};
      if (name) {
        option = { name: { [Op.iLike]: `%${name}%` } };
      }

      if (categoryId) {
        option.categoryId = +categoryId;
      }

      option.status = "Active";

      const products = await Product.findAndCountAll({
        order: [["id", "ASC"]],
        where: option,
        limit,
        offset,
        include: {
          model: Category,
        },
      });

      res.status(200).json({ products: products.rows, total: products.count });
    } catch (err) {
      next(err);
    }
  }
  static async getOneProduct(req, res, next) {
    try {
      // const baseUrl = `https://zaloar-clientclothing.web.app`;
      // const API_KEY = process.env.API_KEY;
      
      // const qrCode = {
      //   url: `https://api.qr-code-generator.com/v1/create?access-token=${API_KEY}`,
      //   method: "post",
      //   data: {
      //     frame_name: "no-frame",
      //     qr_code_text: `${baseUrl}/products/${req.params.id}`,
      //     image_format: "SVG",
      //     qr_code_logo: "scan-me-square",
      //   },
      // };
      
      console.log(111111);
      const product = await Product.findOne({
        where: { id: req.params.id },
        include: { model: Category },
      });

      if (!product) {
        throw { name: "NotFound" };
      }

      //const response = await axios.request(qrCode);
      res.status(200).json({ product });
      //di client: v-html .qr
    } catch (err) {
      next(err);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [["id", "ASC"]] });
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  }

  static async getAllBookmarks(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        order: [["id", "ASC"]],
        where: {
          CustomerId: req.customer.id,
        },
        include: {
          model: Product,
          include: {
            model: Category,
          },
        },
      });
      res.status(200).json({ bookmarks });
    } catch (err) {
      next(err);
    }
  }
  static async addBookmark(req, res, next) {
    try {
      const { ProductId } = req.params;

      const product = await Product.findByPk(+ProductId);
      if (!product) {
        throw { name: "NotFound" };
      }

      const newBookmark = await Bookmark.create({
        CustomerId: req.customer.id,
        ProductId,
      });
      res
        .status(201)
        .json({ message: `${product.name} added to bookmark`, newBookmark });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const bookmark = await Bookmark.findOne({
        where: { id: req.params.id },
        include: {
          model: Product,
        },
      });

      if (!bookmark) {
        throw { name: "NotFound" };
      }

      await bookmark.destroy();
      res
        .status(200)
        .json({ message: `${bookmark.Product.name} is removed from bookmark` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = publicController;
