const express = require("express");
const cartRouter = express.Router();
const {addItemToCart}= require("../controllers/cart");
const {getCartForUserById}= require("../controllers/cart");
const {emptyCart}= require("../controllers/cart");
const {deleteItemFromCart}= require("../controllers/cart");




// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


cartRouter.post("/",authentication, addItemToCart);
cartRouter.get("/:userId",authentication, getCartForUserById);
cartRouter.delete("/:userId",authentication, emptyCart);
cartRouter.post("/:userId/product",authentication, deleteItemFromCart);





// const cartController = require("../controllers/cart");
// router.post("/", authentication,cartController.addItemToCart);
// router.get("/",authentication, cartController.getCart);
// router.delete("/empty-cart",authentication, cartController.emptyCart);

module.exports = cartRouter;
