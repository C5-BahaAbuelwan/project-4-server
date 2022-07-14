// const cartModel = require("../models/cart");
const productsModel = require("../models/products");
const userModel = require("../models/users");
const cartModel = require("../models/cart");
const cartRepository = require("./repository");

const addItemToCart = async (req, res, next) => {
  const { productId } = req.body;
  // let data = null;
  let userId = req.token.userId;

  const quantity = req.body.quantity;

  let cart = await cartModel.findOne({ userId: userId });
  const productDetails = await productsModel.findById(productId);

  console.log("productDetails", productDetails);

  // Check if cart Exists and Check the quantity if items
  try {
    if (cart) {
      console.log(" ----------------in Update Cart---------------");

      let indexFound = cart.items.findIndex(
        (item) => item.productId == productId
      );

      console.log("Index", indexFound);

      //check if product exist,just add the previous quantity with the new quantity and update the total price

      if (indexFound != -1) {
        console.log(
          " ----------------in add the previous quantity with the new quantity and update the total price---------------"
        );

        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, curr) => acc + curr);
      }
      //Check if Quantity is Greater than 0 then add item to items Array
      else if (quantity > 0) {
        console.log(
          " ----------------if Quantity is Greater than 0---------------"
        );

        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: (productDetails.price * quantity).toFixed(2),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, curr) => acc + curr);
      }

      // if quantity of price is 0 throw the error
      else {
        console.log(" ----------------Invalid request---------------");

        return res.status(400).json({
          code: 400,
          message: "Invalid request",
        });
      }

      data = await cart.save();

      return res.status(200).send({
        code: 200,
        message: "update to Cart successfully!",
        data: data,
      });
    }
    //if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created
    else {
      console.log(" ----------------in new user---------------");

      // console.log("in new user");
      console.log("cart before Update Data :", cart);
      console.log(
        "userId:",
        userId,
        "productId",
        productId,
        "quantity",
        quantity
      );

      cart = new cartModel({
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: productDetails.price * quantity,
            price: productDetails.price,
          },
        ],
        subTotal: productDetails.price * quantity,
      });

      console.log("cart after Update Data :", cart);

      cart
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).send({
            code: 200,
            message: "Add to Cart successfully!",
            data: result,
          });
        })
        .catch((err) => {
          return res.status(400).send({
            code: 400,
            message: "error",
            error: err.message,
          });
        });
    }
  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: "error",
      error: error.message,
    });
  }
};

const getCartForUserById = (req, res) => {
  let userId = req.params.userId;

  cartModel
    .findOne({ userId: userId })
    .populate({
      path: "items.productId",
      //   image: { type: String ,require: true},
      select: "title description price  category_id sold image ",
    })
    .then((result) => {
      console.log(result);
      if (result) {
        //   if find the product return the product
        res.status(200).json({
          success: true,
          message: `The cart with userId ⇾ ${userId}`,
          cart: result,
        });
      } else {
        //   if no article with the request id
        res.status(404).json({
          success: false,
          message: `The cart is not found`,
          cart: "Cart is empty",
        });
      }
    })
    .catch((error) => {
      // if the server has an error
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
    });
};

const emptyCart = (req, res) => {
  let userId = req.params.userId;
  cartModel
    .findOneAndDelete({ userId: userId })
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          message: "Cart deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `The Cart: ${userId} is not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server Error",
        err: err.message,
      });
    });
};

const deleteItemFromCart = (req, res) => {
  let userId = req.params.userId;
  let productId = req.body.productId;

  cartModel
    .findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          items: { productId: productId },
        },
      },
      { new: true }
    )
    .then((result) => {
      console.log("result:", result);
      let finalSubtotal = 0;
      result.items.forEach((element) => {
        finalSubtotal = finalSubtotal + element.price * element.quantity;
      });
      cartModel
        .findOneAndUpdate(
          { userId: userId },
          { subTotal: finalSubtotal },
          { new: true }
        )
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "product deleted from Cart",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "server Error",
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server Error",
        err: err.message,
      });
    });
};

module.exports = {
  addItemToCart,
  getCartForUserById,
  emptyCart,
  deleteItemFromCart,
};
