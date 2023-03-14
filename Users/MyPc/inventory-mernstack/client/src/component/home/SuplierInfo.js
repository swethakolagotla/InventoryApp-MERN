import React, { useState } from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//  Style for Supplier info
const paperStyle = { height: "83vh", padding: "25px", margin: "3vh auto", width: "60vw" };
const inputStyle = { padding: "10px" }
const avatarStyle = { backgroundColor: "#68f79a", color: "#ffff", fontSize :"40px", borderRadius:"50px",padding:"8px"}

const SuplierInfo = () => {
   
const [supplierInfoData, SetSuplierInfoData] = useState({
    companyName: "",phone: "",ownerName: "",email:"",address: "",
    country:"",state:"", });

    //  handleChange for supplier data
    const handleChange =(e)=>{
        SetSuplierInfoData({...supplierInfoData, [e.target.name]:e.target.value})
    }

  // create a config to send the auth token 
      const config = {
        headers: {
          //   /we are finding the token from localstorage 
          "Authorization": localStorage.getItem("token")
        },
      };

      // use navigate after clicking the button suplierTable
      const navigate = useNavigate()
      const suplierInfo_btn_submit = async() => {
          try{
        navigate("/suppliertable");
        //get the token from local storage
 const token = localStorage.getItem("token");
  const response=await axios
    .post("http://localhost:5000/supplier/createsupplier", supplierInfoData, {
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
            <Typography variant="h5">Supplier Info</Typography>
          </Grid>
          <Grid align="center">
            <div>
              <TextField
                required
                id="outlined-required"
                label="Companyname"
                style={inputStyle}
                name="companyName"
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
                label="Ownername"
                style={inputStyle}
                name="ownerName"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Address"
                style={inputStyle}
                name="address"
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Country"
                style={inputStyle}
                name="country"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="State"
                style={inputStyle}
                name="state"
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="zip code"
                style={inputStyle}
                name="zip"
                onChange={handleChange}
              />
            </div>
            
            <Button variant="contained" onClick={suplierInfo_btn_submit}>
              Add Suplier
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
}

export default SuplierInfo;