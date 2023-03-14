const express = require("express");
const { createSupplier, getSupplier, updateSupplier, deleteSupplier, getSupplierbyId } = require("../controllers/supplierController");
const router = express.Router();
const {protect}=require("../middlewares/AuthMiddleware")
 router.post("/createsupplier",protect,createSupplier)
 router.get("/getsupplier",protect,getSupplier)
 router.get("/getsupplier/:id", protect, getSupplierbyId);
 router.patch("/updatesupplier/:id",protect,updateSupplier)
 router.delete("/deletesupplier/:id",protect,deleteSupplier)
 module.exports=router