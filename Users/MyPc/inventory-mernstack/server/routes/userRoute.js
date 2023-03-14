const express=require("express");
const router=express.Router()
const {getUser,deleteUser,getUserById,loginUser,registerUser,updateUser}=require("../controllers/userController")
const {protect}=require("../middlewares/AuthMiddleware")
const orderRoute = require("./orderRoute");
router.use("/:customerId/orders", orderRoute);
router.get("/getuser",protect,getUser);
router.get("/getuser/:id",protect,getUserById);
router.post("/registeruser", registerUser);
router.post("/loginuser", loginUser);
router.patch("/updateuser/:id",protect, updateUser);
router.delete("/deleteuser/:id",protect, deleteUser);
module.exports=router;