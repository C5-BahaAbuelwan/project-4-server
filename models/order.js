const mongoose = require("mongoose");

//quantity
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

module.exports = mongoose.model("Orders", orderSchema);
