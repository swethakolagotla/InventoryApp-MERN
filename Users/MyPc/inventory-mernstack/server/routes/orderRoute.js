const express = require("express");
const {  getAllOrders,getOrder,updateOrder,deleteOrder,createOrder ,addCustomerId} = require("../controllers/orderController");
const router=express.Router();
const { body } = require("express-validator");
const {protect}=require("../middlewares/AuthMiddleware")
router
  .route("/")
  .get( protect,  getAllOrders)
  .post(
    protect,
    addCustomerId,
    createOrder
  );

router
  .route("/:id")
  .get( protect, getOrder)
  .patch( protect,  updateOrder)
  .delete( protect,  deleteOrder);

module.exports = router;