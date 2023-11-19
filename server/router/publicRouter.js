const express = require("express");
const router = express.Router();

const publicController = require("../Controllers/publicController");
const { publicAuthentication } = require("../middlewares/authentication");

router.post("/login", publicController.login);
router.post("/register", publicController.register);
router.post("/google-sign-in", publicController.googleSignIn);

router.get("/products", publicController.getAllProducts);
router.get("/products/:id", publicController.getOneProduct);
router.get("/categories", publicController.getAllCategories);

router.use(publicAuthentication);

router.get("/bookmarks", publicController.getAllBookmarks);
router.post("/bookmarks/:ProductId", publicController.addBookmark);
router.delete("/bookmarks/:id", publicController.deleteBookmark);

module.exports = router;
