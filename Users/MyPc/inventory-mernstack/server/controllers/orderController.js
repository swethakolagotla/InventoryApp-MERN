const catchAsync = require("../middlewares/catchAsync");
const Orders = require("./../models/orderModel");
const {getOne,deleteOne,updateOne } = require("./factoryFunction");
const sendEmail = require("./../middlewares/email");
const Customers = require("./../models/customerModel");

const addCustomerId = (req, res, next) => {
  if (!req.body.customer) req.body.customer = req.params.customerId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

const createOrder = catchAsync(async (req, res, next) => {
  const order = await Orders.create(req.body);
  console.log(req.body)

  const customer = await Customers.findById(req.params.id);
console.log(customer)
  const email = customer.email;
  const subject = "order placed";
  const message = `your order has been placed`;

  try {
    sendEmail({
      email,
      subject,
      message,
    });
  } catch (err) {}

  res.status(201).json({
    status: "success",
    order,
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  let query = { user: { _id: req.user.id } };
  console.log(query)
  
  const order = await Orders.find(query);
  res.status(200).json({
    status: "success",
    order,
  });
});

const getOrder = getOne(Orders);

const deleteOrder = deleteOne(Orders);

const updateOrder = updateOne(Orders);
module.exports={getOrder,updateOrder,deleteOrder,getAllOrders, createOrder,addCustomerId}