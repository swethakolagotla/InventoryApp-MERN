const Business = require("../models/businessModel");
const { validationResult } =require( "express-validator");
//  Route for crete BusinessInfo
const createbusiness = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let business = await Business.findOne({
      email: req.body.email,
 
    });
    if (business) {
      return res.status(400).json({
        error: "This business is allready register with this mail and pan",
      });
    }

    // Create a new Business Info

    business = await Business({
      companyname: req.body.companyname,
      phone: req.body.phone,
      ownername: req.body.ownername,
      email: req.body.email,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      pincode: req.body.pincode,
    });
    business.save();
    // res.json(product)
    res.json({ business });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//   Route for GET BusinessInfo

const getBusiness = async (req, res) => {
  try {
    const business = await Business.find();
    res.json(business);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server Error");
  }
};

const updatebusiness = async (req, res) => {
  const {
    companyname,
    phone,
    ownername,
    email,
    address,
    country,
    state,
  pincode
 
  } = req.body;

  try {
    // Create a new Bussiness  object
    const newbusiness = {};
    if (companyname) {
      newbusiness.companyname = companyname;
    }
    if (phone) {
      newbusiness.phone = phone;
    }
    if (ownername) {
      newbusiness.ownername = ownername;
    }
    if (email) {
      newbusiness.email = email;
    }
    if (address) {
      newbusiness.address = address;
    }
    if (country) {
      newbusiness.country = country;
    }
    if (state) {
      newbusiness.state = state;
    }
    if (pincode) {
      newbusiness.pincode = pincode;
    }
   

    // Find the note to be updated and update it
    let business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send("Not Found");
    }
    business = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: newbusiness },
      { new: true }
    );
    res.json({ message:"successfully updated",business });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Route for Delete product

const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business.businessId === req.body.businessId) {
      await business.deleteOne();
      res.status(200).json("the business Info has been deleted");
    } else {
      res.status(403).json("you can delete only your business Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports={ deleteBusiness, getBusiness, updatebusiness, createbusiness };
