const express = require("express");
const route = express.Router();
const productController = require("../controller/product.controller");

route.get("/api/product", productController.getProductDetails);
route.get("/api/product/:id", productController.getProductDetailsById);
route.post("/api/product", productController.createProductDetails);
route.put("/api/product/:id", productController.updateProductDetails);
route.delete("/api/product/:id", productController.deleteProductDetails);

module.exports = route;
