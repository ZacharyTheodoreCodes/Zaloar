if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router");
const { errHandler } = require("./middlewares/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 *npx sequelize-cli db:create --env test
 *npx sequelize-cli db:migrate --env test
 *npx sequelize-cli db:seed:all --env test
 */

module.exports = app;
