const { Product } = require("../models/");

const authorization = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw { name: "NotFound" };
    if (req.user.role !== "Admin" && product.authorId !== req.user.id)
      throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

const modifyAuthorization = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw { name: "NotFound" };
    if (req.user.role!== "Admin") throw {name: "Forbidden"}
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, modifyAuthorization };
