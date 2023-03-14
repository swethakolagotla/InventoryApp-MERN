const mongoose =require( "mongoose");
const business_InfoSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  ownername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
pincode:{
    type:Number,
}
 
}); //business
const businessModel = mongoose.model(
  "business",
  business_InfoSchema,
  "business"
);
module.exports= businessModel;
