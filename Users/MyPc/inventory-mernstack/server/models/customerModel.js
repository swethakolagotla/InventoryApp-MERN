const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    name: { type: String },
   productName: { type: String },
    phone: { type: String },
    email: { type: String },
    state:{type:String},
    country:{type:String},
    address:{type:String},
    pincode:{type:String},
    CreatedDate: { type: Date, default: Date.now() },
  },
 
);
module.exports = mongoose.model("customers", DataSchema );
 
