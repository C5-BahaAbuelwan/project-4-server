const express = require("express");
const { createNewProduct } = require("../controllers/products");
const { getAllProducts } = require("../controllers/products");
const { getProductById } = require("../controllers/products");
const { updateProductById } = require("../controllers/products");
const { deleteProductById } = require("../controllers/products");
const { creatNewFeedBack } = require("../controllers/feedBack");
const { deleteFeedBackById } = require("../controllers/feedBack");
const {getAllProductsFiltration}=require("../controllers/products");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const productsRouter = express.Router();

productsRouter.post("/",authentication, createNewProduct);
productsRouter.get("/:page/:limit", getAllProducts);
productsRouter.get("/", getAllProductsFiltration);

productsRouter.get("/:id", getProductById);
productsRouter.put("/:id",authentication, updateProductById);
productsRouter.delete("/:id",authentication, deleteProductById);
productsRouter.delete(
  "/:id/feedback",
  authentication,
  // authorization("DELETE_FeedBack"),
  deleteFeedBackById
);

productsRouter.post(
  "/:id/feedback",
  authentication,
  // authorization("CREATE_FeedBack"),
  creatNewFeedBack
);

module.exports = productsRouter;
