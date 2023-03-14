import React, { useState } from "react";
import {Avatar,Grid,Paper,Typography,TextField,Button,} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignCompo = () => {

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  //  handlechange  for sign in page
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
   //   navigate page if your don't have account then you will go sign in page
   const naviagte = useNavigate();
  //  axios post for sign in
  const handleSignup = () => {
    axios.post("http://localhost:5000/api/registeruser", signupData).then((res) => {
      let response = res.data;
      console.log(response)
      if (response.success === true) {
        localStorage.setItem("token", response.authtoken);
        naviagte("/login");
      }
    });
  
  };

  //  Styling for SignIn Page
  const papreStyle = {
    padding: "20px",
    height: "75vh",
    width: "280px",
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "#68f79a" };

  return (
    <Grid>
      <Paper elevation={10} style={papreStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Signup Form
          </Typography>
        </Grid>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          fullWidth
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          type="email"
          label="Email"
          variant="standard"
          fullWidth
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="standard-password-input"
          label="PhoneNumber"
          type="Tel"
          variant="standard"
          fullWidth
          name="phone"
          onChange={handleChange}
        />

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          fullWidth
          name="password"
          onChange={handleChange}
        />
        <Grid align="Center">
          <br />
          <Button variant="contained" fullWidth onClick={handleSignup}>
            Signup
          </Button>
        </Grid>
        <br />
        <Typography>
          Move to page
          <Link to="/">login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default SignCompo;
