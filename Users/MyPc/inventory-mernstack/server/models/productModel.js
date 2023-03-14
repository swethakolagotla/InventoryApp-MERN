const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
   type: Number,
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("product", productSchema);
