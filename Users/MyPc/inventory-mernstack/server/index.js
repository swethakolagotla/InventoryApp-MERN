const express=require("express");
const dotenv=require("dotenv").config();
const {errorHandler}=require("./middlewares/errorHandler");
const colors=require("colors");
const connectDB=require("./config/db")
const port=process.env.PORT||5000;
const cors=require("cors")
const app=express()
connectDB();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use("/api",require("./routes/userRoute"))
app.use("/supplier",require("./routes/supplierRoute"))
app.use("/order",require("./routes/orderRoute"))
app.use("/product",require("./routes/productRoute"))
app.use("/customer",require("./routes/customerRoute"))
app.use("/business",require("./routes/businessRoute"))
app.use(errorHandler);
app.listen(port,()=>console.log(`server started on ${port}`))