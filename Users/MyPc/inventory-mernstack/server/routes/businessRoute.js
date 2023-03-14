const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  createbusiness,
  deleteBusiness,
  getBusiness,
  updatebusiness,
} =require( "../controllers/businessController");
 
 
 router.post(
   "/createbusinessInfo",

   [
     body("companyname", "Enter a valid company name").isLength({ min: 3 }),
     body("phone", "Enter a 10 character ").isLength({ min: 10 }),
     body("ownername", "Enter a owner Name ").isLength({ min: 3 }),
     body("email", "Enter a valid email").isEmail(),
     body("address", "Enter a valid Address ").isLength({ min: 3 }),
     body("country", "Enter a country Name ").isLength({ min: 3 }),
     body("state", "Enter a State ").isLength({ min: 3 }),
     body("pincode", "Enter a pincode").isLength({ min: 3 }),
   ],
protect,
   createbusiness
 );
 router.get("/getbusiness", protect, getBusiness);
 router.patch("/updatebusiness/:id", protect, updatebusiness);
 router.delete("/deletebusiness/:id", protect, deleteBusiness);

module.exports = router;
