const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String , require: true},
  description: { type: String ,require: true },
  price: { type: String ,require: true},
  image: { type: String ,require: true},
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  feedBack: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeedBack" }],
  sold:{
    type:Number, default:0
  }

});

module.exports = mongoose.model("Product", productSchema);

