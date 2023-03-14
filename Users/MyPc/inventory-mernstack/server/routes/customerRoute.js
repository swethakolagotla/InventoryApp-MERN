const express = require("express");
 const router = express.Router();
 const { body } = require("express-validator");
 const { protect } = require("../middlewares/AuthMiddleware");
const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController");
 router.post("/createcustomer", protect, [
   body("name", "Enter a valid  name").isLength({ min: 3 }),
   body("email", "Enter a valid email").isEmail(),
   body("phone", "Enter a 10 character ").isLength({ min: 10 }),
   body("productName", "Enter a product Name ").isLength({ min: 3 }),
   body("state", "Enter a valid state ").isLength({ min: 3 }),
  
 ],createCustomer);
 router.get("/getcustomer",protect,getCustomer)
 router.patch("/updatecustomer/:id",protect,updateCustomer)
 router.delete("/deleteCustomer/:id",protect,deleteCustomer);
 module.exports=router;