import React, { useState } from "react";
import {Avatar, Grid,Paper,Typography,TextField,Button,} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// styling for login page
const avatarStyle = { backgroundColor: "#68f79a" };
const papreStyle = {
  padding: "20px",
  height: "63vh",
  width: "280px",
  margin: "100px auto",
};

const LoginCompo = () => {
  
const [signInData, setSignInData] = useState({
    email: "",
    password: "",
});
//   HandleChange for Sign in user
  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  //  Navigate page after login go to main page
  const navigate = useNavigate();

  //  axios req for sign in user
  const handleSignin = () => {
    axios.post("http://localhost:5000/api/loginuser", signInData).then((res) => {
      let response = res.data;
      if (response.success === true) {
        localStorage.setItem("token", response.authtoken);
        navigate("/main");
      } else {
        console.log("token not present");
      }
    });
  };

  return (
    <Grid>
      <Paper elevation={10} style={papreStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Login Form
          </Typography>
        </Grid>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          fullWidth
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          name="password"
          onChange={handleChange}
          fullWidth
        />
        <Grid align="Center">
          <br />
          <Button variant="contained" fullWidth onClick={handleSignin}>
            Login
          </Button>
        </Grid>
        <br />
        <Typography>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginCompo;
