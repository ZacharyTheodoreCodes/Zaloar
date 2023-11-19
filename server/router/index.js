const express = require("express");
const router = express.Router();

const authController = require("../Controllers/auth");
const { authentication } = require("../middlewares/authentication");
const adminRouter = require("./adminRouter.js");
const publicRouter = require("./publicRouter.js");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google-sign-in", authController.googleSignIn);

router.use("/pub", publicRouter);

router.use(authentication);

router.use("/", adminRouter);

module.exports = router;
