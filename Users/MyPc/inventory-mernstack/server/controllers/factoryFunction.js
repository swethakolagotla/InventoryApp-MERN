const catchAsync = require("../middlewares/catchAsync");

const getAll = (modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await modal.find({ user: { _id: req.currentUser.id } });

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

const createOne = (modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await modal.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

const deleteOne = (modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await modal.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: doc,
    });
  });

const getOne = (modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await modal.findById(req.currentUser.id);

    res.status(200).json({
      stasus: "success",
      data: doc,
    });
  });

const updateOne = (modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
  module.exports={updateOne,getAll,getOne,deleteOne,createOne}