 
const Supplier = require("../models/supplierModel");
const asyncHandler=require("express-async-handler")
 
const { validationResult } =require("express-validator");
 // Route for create BusinessInfo
 const createSupplier = asyncHandler(async (req, res) => {
   // If there are errors, return Bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   try {
     // Create a new product
     let supplier = await Supplier({
       companyName: req.body.companyName,
       phone: req.body.phone,
       ownerName: req.body.ownerName,
       email: req.body.email,
       address: req.body.address,
       country: req.body.country,
       state: req.body.state,
  
     });
     supplier.save();
     // res.json(product)
     res.json({ supplier });
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
 });

 //   Route for GET BusinessInfo

 const getSupplier = asyncHandler(async (req, res) => {
   try {
  
     const supplier = await Supplier.find( );
     res.json(supplier);
   } catch (error) {
     console.error(error);
     res.status(500).send("internal server Error");
   }
 });
 const getSupplierbyId = asyncHandler(async (req, res) => {
   try {
     const supplier = await Supplier.findById(req.params.id);
     res.json(supplier);
   } catch (error) {
     console.error(error);
     res.status(500).send("internal server Error");
   }
 });
 //  Route for Update product

 const updateSupplier = async (req, res) => {
   const {
     companyName,
     phone,
     ownerName,
     email,
     address,
     country,
     state,
  
   } = req.body;

   try {
     // Create a new supplier  object
     const newsupplier = {};
     if (companyName) {
       newsupplier.companyName = companyName;
     }
     if (phone) {
       newsupplier.phone = phone;
     }
     if (ownerName) {
       newsupplier.ownerName = ownerName;
     }
     if (email) {
       newsupplier.email = email;
     }
     if (address) {
       newsupplier.address = address;
     }
     if (country) {
       newsupplier.country = country;
     }
     if (state) {
       newsupplier.state = state;
     }
    

     // Find the note to be updated and update it
     let supplier = await Supplier.findById(req.params.id);
     if (!supplier) {
       return res.status(404).send("Not Found");
     }
     supplier = await Supplier.findByIdAndUpdate(
       req.params.id,
       { $set: newsupplier },
       { new: true }
     );
     res.json({ supplier });
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
 };

 //  Route for Delete product

 const deleteSupplier = async (req, res) => {
   try {
     const supplier = await Supplier.findById(req.params.id);
     if (supplier.supplierId === req.body.supplierId) {
       await supplier.deleteOne();
       res.status(200).json("the supplier Info has been deleted");
     } else {
       res.status(403).json("you can delete only your supplier Info");
     }
   } catch (err) {
     res.status(500).json(err);
   }
 };
 

module.exports={createSupplier,getSupplier,deleteSupplier,updateSupplier,getSupplierbyId}