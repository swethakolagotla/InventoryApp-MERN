const asyncHandler= require("express-async-handler");
const { validationResult } = require("express-validator");
const Customer = require("../models/customerModel");
const createCustomer=asyncHandler(async(req,res)=>{
  
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let customer = await Customer.findOne({
        email: req.body.email,
      });
     if (customer) {
       return res
         .status(400)
         .json({ error: "This customer is allready register with this  Email " });
     }
      // Create a new product
       customer = await Customer({
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone,
         productName: req.body.productName,
         state: req.body.state,
         country:req.body.country,
         address:req.body.address,
         pincode:req.body.pincode
       });
  customer.save()
      // res.json(customer)
      res.json({ customer });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
 
})
const getCustomer=asyncHandler(async(req,res)=>{
    try {
    const customer = await Customer.find();
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server Error");
  }
});
const updateCustomer=asyncHandler(async(req,res)=>{
    const {
   name,
      email,
      phone,
     productName,
      state,
      country,
      address,
      pincode
      
    } = req.body;

    try {
      // Create a new Bussiness  object
      const newcustomer = {};
      if ( name) {
        newcustomer.name =  name;
      }
      if (email) {
        newcustomer.email = email;
      }
      if (phone) {
        newcustomer.phone = phone;
      }
      if (productName) {
        newcustomer.productName = productName;
      }
      if (state) {
        newcustomer.state = state;
      }
       if (country) {
         newcustomer.country = country;
       }
        if (address) {
          newcustomer.address = address;
        }
     
         if (pincode) {
           newcustomer.pincode= pincode;
         }
     
     

      // Find the note to be updated and update it
      let customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).send("Not Found");
      }
      customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: newcustomer },
        { new: true }
      );
      res.json({ customer });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
const deleteCustomer=asyncHandler(async(req,res)=>{
     try {
       const customer = await Customer.findById(req.params.id);
       if (customer.customerId === req.body.customerId) {
         await customer.deleteOne();
         res.status(200).json("successfully deleted");
       } else {
         res.status(401).json("you can delete only your business Info");
       }
     } catch (err) {
       res.status(500).json(err);
     }
})
module.exports={createCustomer,getCustomer,updateCustomer,deleteCustomer}