const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/adminController");
const {
  authorization,
  modifyAuthorization,
} = require("../middlewares/authorization");

router.get("/products", adminController.getAllProducts);
router.post("/products", adminController.postProduct);
router.get("/products/:id", adminController.getOneProduct);
router.delete("/products/:id", authorization, adminController.deleteOneProduct);
router.put("/products/:id", authorization, adminController.replaceProduct);
router.patch(
  "/products/:id",
  modifyAuthorization,
  adminController.modifyProduct
);

router.get("/categories", adminController.getAllCategories);
router.post("/categories", adminController.postCategory);
router.put("/categories/:id", adminController.replaceCategory);
router.delete("/categories/:id", adminController.deleteCategory);

router.get("/histories", adminController.getHistories);

module.exports = router;
