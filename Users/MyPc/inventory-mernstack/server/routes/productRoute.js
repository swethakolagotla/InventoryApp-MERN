 const express = require("express");
 const { getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
 const router = express.Router();
 const { body } = require("express-validator");
 const { protect } = require("../middlewares/AuthMiddleware");
 router.post("/createproduct", protect, [
   body("name", "Enter a valid product name").isLength({ min: 3 }),
   body("quantity", "Enter at least 1 Quantity").isLength({ min: 1 }),
   body("price", "Enter a product price").isLength({ min: 1 }),
   body('stock', 'Enter a stock number').isLength({ min: 1 }),
   body("modelNo", "Enter a Product ModelNo").isLength({ min: 1 }),
 ],createProduct);
 router.get("/getproduct",protect,getProduct)
 router.patch("/updateproduct/:id",protect,updateProduct)
 router.delete("/deleteproduct/:id",protect,deleteProduct)
 module.exports=router;
 
