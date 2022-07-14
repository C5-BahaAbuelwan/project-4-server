const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  feedBack: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("FeedBack", feedBackSchema);
