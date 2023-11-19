const { verifyToken } = require("../helpers/jwt");
const { User, Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    //cek user bawa token/engga
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    //cek access_tokennya terverifikasi atau engga
    const verified = verifyToken(access_token);

    //cek apakah user yang login masih ada di database/engga
    const user = await User.findByPk(verified.id);
    if (!user) throw { name: "InvalidToken" };

    //melempar data user ke fungsi berikut2nya
    req.user = user;

    //next -> mengizinkan fungsi berikutnya untuk jalan
    next();
  } catch (error) {
    next(error);
  }
};

const publicAuthentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const verified = verifyToken(access_token);

    const customer = await Customer.findByPk(verified.id);
    if (!customer) throw { name: "InvalidToken" };

    //melempar data customer ke fungsi berikut2nya
    req.customer = customer;

    //next -> mengizinkan fungsi berikutnya untuk jalan
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, publicAuthentication };
