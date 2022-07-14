const Cart = require("../models/cart");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
//   image: { type: String ,require: true},
  select: "title description price  category_id sold image "
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}
