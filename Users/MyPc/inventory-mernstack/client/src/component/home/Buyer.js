import React, { useState } from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Buyer = () => {
const paperStyle = { height: "75vh", padding: "25px", margin: "5vh auto", width: "60vw" };
const inputStyle = { padding: "10px" }
const avatarStyle = { backgroundColor: "#68f79a", color: "#ffff", fontSize :"40px", borderRadius:"50px",padding:"8px"}


const [buyerData, SetBuyerData] = useState({ name: "",phone: "",  
email:"", productName:"",   address: "", country:"", state:"", pincode:"" });
     
// handle change for update data of buyer
const handleChange =(e)=>{
SetBuyerData({...buyerData, [e.target.name]:e.target.value})}

// Handlechange for after clicking button buyer
 const navigate = useNavigate()
const buyer_btn_submit = async() => {
    try{
           navigate('/buyertable')
 const token = localStorage.getItem("token");
  const response=await axios
    .post("http://localhost:5000/customer/createcustomer", buyerData, {
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
            <Typography variant="h5">Buyer</Typography>
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
                label="Phone"
                style={inputStyle}
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                style={inputStyle}
                name="email"
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="ProductName"
                style={inputStyle}
                name="productName"
                onChange={handleChange}
              />
            </div>
       
            <div>
              <TextField
                required
                id="outlined-required"
                label="address"
                style={inputStyle}
                name="address"
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="country"
                style={inputStyle}
                name="country"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="state"
                style={inputStyle}
                name="state"
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="pincode"
                style={inputStyle}
                name="pincode"
                onChange={handleChange}
              />
            </div>

            <Button variant="contained" onClick={buyer_btn_submit}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
}
export default Buyer;