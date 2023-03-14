import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//   Style for product info
const paperStyle = {
  height: "60vh",
  padding: "25px",
  margin: "3vh auto",
  width: "60vw",
};
const inputStyle = { padding: "10px" };
const avatarStyle = {
  backgroundColor: "#68f79a",
  color: "#ffff",
  fontSize: "40px",
  borderRadius: "50px",
  padding: "8px",
};

const ProductInfo = () => {

const [productData, SetproductData] = useState({name: "",quantity: "",price: "",modelNo: "",});

// HandleChange for  for set product
const handleChange = (e) => {
  SetproductData({ ...productData, [e.target.name]: e.target.value });
};

// Navigate page to ProductTable
const navigate = useNavigate();
const product_btn_submit = async () => {
  // axios request  for create product info
    try{
        navigate("/producttable");
        //get the token from local storage
 const token = localStorage.getItem("token");
  const response=await axios
    .post("http://localhost:5000/product/createproduct", productData, {
      headers: {
       "Authorization": `Bearer ${token}`,
      },
    })
        console.log(response) 
          return response.data.data
          }
    catch (err) {
          console.log(err.response)
        }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <BusinessIcon style={avatarStyle} />
          <Typography variant="h5">ProductInfo</Typography>
        </Grid>
        <Grid align="center">
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              style={inputStyle}
              name="name"
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              style={inputStyle}
              name="quantity"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Price"
              style={inputStyle}
              name="price"
              onChange={handleChange}
            />

            <TextField
              required
              id="outlined-required"
              label="ModelNo"
              style={inputStyle}
              name="modelNo"
              onChange={handleChange}
            />
          </div>
          <br />
          <Button variant="contained" onClick={product_btn_submit}>
            Add Product
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ProductInfo;
