const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  country: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  // cart :[{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],

    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 3);
});

module.exports = mongoose.model("User", userSchema);
