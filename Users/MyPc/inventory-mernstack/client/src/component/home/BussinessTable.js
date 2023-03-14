import React, { useEffect, useState } from "react";
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,} from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";
import "../../App.css";

// style for business Table
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "70vh",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputStyle = { padding: "10px" };
const avatarStyle = {
  backgroundColor: "#68f79a",
  color: "#ffff",
  fontSize: "40px",
  borderRadius: "50px",
  padding: "8px",
};

function BussinessTable() {

const [data, SetData] = useState([]);
const [updateData, SetUpdateData] = useState({
    companyname: "",phone: "",ownername: "",email: "",address: "",country: "",state: "", pincode:"",
  }); 
//  model open close 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error,setError]=useState(null);

  //  HandleChange update Business data
  const handleChange = (e) => {
    SetUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

 //  navigate page after clicking button business info
 const navigate=useNavigate();
  const handle_navigate = () => {
    navigate("/businessinfo");
  };

  // create a config to send the auth token 
  const config = {
    headers: {
      //   we are finding the token from localstorage
      Authorization: localStorage.getItem("token"),
    },
  };

  const update_btn = (ele) => {
    handleOpen();
    SetUpdateData(ele);
  };

//   axios req for update  business info 
  const update_submit = (id) => {
    console.log(id);
    axios
      .put(
        `http://localhost:5000/business/updatebusiness/${id}`,
        updateData,
        config
      )
      .then((res) => {
        console.log(res.data);

        handleClose();
      });
  };

  // axios req for delete business info
  const handle_delete = (id) => {
    axios
      .delete(`http://localhost:5000/business/deletebusiness/${id}`, {
        headers: {
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  
  //  axios req for get business info
 useEffect(() => {
   getdata();
 }, []);
 var auth = localStorage.getItem("token");
 //axios call for get the user name
 const getdata = async () => {
   try {
     // create a config to send the auth token

     //   we are finding the token from localstorage
     

     //console.log(auth);
     // make sure the axios request should be  synchronous
     await axios
       .get("http://localhost:5000/business/getbusiness", {
         headers: {
           Authorization: "Bearer " + auth,
         },
       })
       .then((res) => {
         //console.log(res);
         SetData(res.data);
         setError(null);
       });
   } catch (error) {
     setError(error);
   }
 }; 

  return (
    <>
      <h2 align="center" className="product">Business Data Table</h2>
      <div style={{ textAlign: "right", marginRight: "30px" }}>
        <Button variant="contained" onClick={handle_navigate}>
          Add Business
        </Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "300px", marginTop: "30px" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">companyName</TableCell>
              <TableCell align="center">phone</TableCell>
              <TableCell align="center">ownerName</TableCell>
              <TableCell align="center"> email</TableCell>
              <TableCell align="center"> address</TableCell>
              <TableCell align="center"> country</TableCell>
              <TableCell align="center"> state</TableCell>
             
              <TableCell align="center"> pincode</TableCell>
              <TableCell align="center"> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ele, id) => {
              return (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-chid th": { border: 0 } }}
                >
                  <TableCell align="center"> {ele.companyname}</TableCell>
                  <TableCell align="center"> {ele.phone}</TableCell>
                  <TableCell align="center"> {ele.ownername}</TableCell>
                  <TableCell align="center"> {ele.email}</TableCell>
                  <TableCell align="center"> {ele.address}</TableCell>
                  <TableCell align="center"> {ele.country}</TableCell>
                  <TableCell align="center"> {ele.state}</TableCell>
                  <TableCell align="center"> {ele.pincode}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => update_btn(ele, id)} />
                    <DeleteIcon onClick={() => handle_delete(ele._id)} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
{/* update Business Modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={open}>
            <Box>
              <Grid>
                <Paper elevation={10} sx={style}>
                  <Grid align="center">
                    <BusinessIcon style={avatarStyle} />
                    <Typography variant="h5">Busniess Info Update</Typography>
                  </Grid>
                  <Grid align="center">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Companyname"
                        name="companyName"
                        onChange={handleChange}
                        value={updateData.companyname}
                        style={inputStyle}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        style={inputStyle}
                        name="phone"
                        onChange={handleChange}
                        value={updateData.phone}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Ownername"
                        style={inputStyle}
                        name="ownerName"
                        onChange={handleChange}
                        value={updateData.ownername}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        style={inputStyle}
                        name="email"
                        onChange={handleChange}
                        value={updateData.email}
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
                        value={updateData.address}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Country"
                        style={inputStyle}
                        name="country"
                        onChange={handleChange}
                        value={updateData.country}
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
                        value={updateData.state}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Zip"
                        style={inputStyle}
                        name="zip"
                        onChange={handleChange}
                        value={updateData.pincode}
                      />
                    </div>
                     
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginRight: "10px" }}
                      onClick={() => update_submit(updateData._id)}
                    >
                      Update Business
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      {" "}
                      Cancel
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default BussinessTable;
