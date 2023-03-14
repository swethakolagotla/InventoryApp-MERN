import React, { useState } from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusinessInfo = () => {
    const paperStyle = { height: "95vh", padding: "25px",  margin: "10px  auto",  width: "100vh" };
    const inputStyle = { padding: "10px" }
    const avatarStyle = { backgroundColor: "pink", color: "#ffff", fontSize :"40px", borderRadius:"50px",padding:"8px"}
     
const [businessInfoData, SetbusinessInfoData] = useState({
    companyname: "", phone: "",ownername: "", email:"",address: "",
    country:"", state:"",pincode:""});

    //     handleChange for business info Update
      const handleChange =(e)=>{
        SetbusinessInfoData({...businessInfoData, [e.target.name]:e.target.value})
    }

       // navigation  page after clicking bussinesstable page
       const navigate = useNavigate()
  

        // create a config to send the auth token 
     
     
   // axios req for create Business info  
  const businessInfo_btn_submit = async() => {
    try{
           navigate('/businesstable')
 const token = localStorage.getItem("token");
  const response=await axios
    .post("http://localhost:5000/business/createbusinessInfo", businessInfoData, {
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
    <Grid  >
 <Paper elevation={10} style={paperStyle}>
     <Grid align="center">
         <BusinessIcon style={avatarStyle} />
         <Typography variant="h5">
             business Info
         </Typography>
     </Grid>
     <Grid align="center">
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Companyname"
                 name='companyname'
                 onChange={handleChange}
                 style={inputStyle}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Phone"
                 style={inputStyle}
                 name='phone'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Ownername"
                 style={inputStyle}
                 name='ownername'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Email"
                 style={inputStyle}
                 name='email'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Address"
                 style={inputStyle}
                 name='address'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Country"
                 style={inputStyle}
                 name='country'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="State"
                 style={inputStyle}
                 name='state'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="pincode"
                 style={inputStyle}
                 name='pincode'
                 onChange={handleChange}
             />
         </div>
            
         <Button variant="contained"  style={{marginRight:'10px'}} onClick={businessInfo_btn_submit} >Add Business</Button>
     </Grid>
 </Paper>
</Grid>
   )
 }
 
 export default BusinessInfo