const errHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      const errObj = {};
      err.errors.map((perErr) => {
        if (!errObj[perErr.path]) {
          errObj[perErr.path] = perErr.message;
        }
      });
      // res.status(400).json({ message: err.errors[0].message });
      res.status(400).json({ message: errObj });
      break;
    case "InvalidInput":
      res.status(400).json({ message: "Email and password is required" });
      break;
    case "InvalidEmail/Password":
      res.status(401).json({ message: "Invalid email or password" });
      break;
    case "NotFound":
      res.status(404).json({ message: `Product not found` });
      break;
    case "JsonWebTokenError":
    case "InvalidToken":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden" });
      break;
    default:
      console.log(err.name);
      res.status(500).json({ message: `Internal Server Error` });
      break;
  }
};

module.exports = { errHandler };
