const express = require("express");
const {
  addProduct,
  removeProduct,
  getAllProducts,
} = require("../controllers/product");
const Product = require("../models/product");
const router = express.Router();

router.post("/addProduct", addProduct);
router.delete("/deleteProduct", removeProduct);
router.get("/getAllProducts", getAllProducts);

module.exports = router;
