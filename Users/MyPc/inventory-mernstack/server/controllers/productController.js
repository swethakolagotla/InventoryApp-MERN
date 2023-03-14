const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Product=require("../models/productModel")
const createProduct=asyncHandler(async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let product = await Product.findOne({ modelNo: req.body.modelNo });
      if (product) {
        return res
          .status(400)
          .json({ error: "Sorry  this product already exists" });
      }
      // Create a new product
      product = await Product.create({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        modelNo: req.body.modelNo,
        stock:req.body.stock
      });
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
const getProduct=asyncHandler(async(req,res)=>{
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    } 
})
const updateProduct=asyncHandler(async(req,res)=>{
    const { name, quantity, price, modelNo ,stock} = req.body;

    try {
      // Create a newproduct object
      const newproduct = {};
      if (name) {
        newproduct.name = name;
      }
      if (price) {
        newproduct.price = price;
      }
      if (modelNo) {
        newproduct.modelNo = modelNo;
      }
      if (quantity) {
        newproduct.quantity = quantity;
      }
       if (stock) {
        newproduct.stock = stock;
      }


      // Find the note to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("Not Found");
      }
      product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: newproduct },
        { new: true }
      );
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
const deleteProduct=asyncHandler(async(req,res)=>{
     try {
       const product = await Product.findById(req.params.id);
       if (product.productId === req.body.productId) {
         await product.deleteOne();
         res.status(200).json("the Product has been deleted");
       } else {
         res.status(403).json("you can delete only your Product");
       }
     } catch (err) {
       res.status(500).json(err);
     }
})
module.exports={createProduct,getProduct,updateProduct,deleteProduct}
