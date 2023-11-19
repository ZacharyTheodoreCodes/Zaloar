const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class authController {
  static async register(req, res, next) {
    try {
      const user = await User.create({ ...req.body });
      res.status(201).json({
        message: `user with email ${user.email} and username ${user.username} is created`,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      //cek email atau passwordnya ada atau engga
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }

      //cari user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidEmail/Password" };
      }
      //cek passwordnya sama atau engga
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "InvalidEmail/Password" };
      }
      //bikin access token
      const access_token = signToken({ id: user.id });
      //response dengan token
      res.status(200).json({
        access_token,
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
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
      //1.cek apakah user sudah punya akun atau belum
      //2.If !user => bikinin akun/data baru di database
      //3.else kita login si user => bikin access_token sesuai data user
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random() * 10,
          phoneNumber: "nomor_dari_google",
          address: "alamat_dari_google",
          role: "Staff",
        },
        hooks: false,
      });

      //bikin access token
      const access_token = signToken({ id: user.id });
      //response dengan token
      res
        .status(200)
        .json({
          access_token,
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = authController;
