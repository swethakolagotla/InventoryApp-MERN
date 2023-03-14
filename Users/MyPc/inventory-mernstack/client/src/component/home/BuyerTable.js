import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import "../../App.css"

// Style for Buyer-table
const inputStyle = { padding: "10px" };
const avatarStyle = {
  backgroundColor: "#68f79a",
  color: "#ffff",
  fontSize: "40px",
  borderRadius: "50px",
  padding: "8px",
};
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


const BuyerTable = () => {

  const [data, SetData] = useState([]);
  const [updateData, SetUpdateData] = useState({
    customerId: "",phone: "",name: "",email: "",productName: "",
   address: "",country: "",state: "" ,pincode:""});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error,setError]=useState(null)
  //  navigate page to create buyer
  const navigate = useNavigate();

 // create a config to send the auth token 

 
  // Navigate page after clicking button add buyer  
  const handle_navigate = () => {
    navigate("/buyer");
  };

  const handleChange = (e) => {
    SetUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // axios call for delete buyer information
  const handle_delete = (id) => {
    axios
      .delete(`http://localhost:5000/customer/deletecustomer/${id}`, {
        headers: {
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  // axios call for Update buyer information  
  const update_btn = (ele, id) => {
    handleOpen();
    SetUpdateData(ele);
  };
   let auth = localStorage.getItem("token");
  const update_submit = (id) => {
    console.log(id);
    axios
      .patch(`http://localhost:5000/customer/updatecustomer/${id}`, updateData, { headers: {
           Authorization: "Bearer " + auth,
         }})
      .then((res) => {
        console.log(res.data);

        handleClose();
      });
  };

  // axios call for Get  buyer information
 useEffect(() => {
   getdata();
 }, []);
 //axios call for get the user name
 const getdata = async () => {
   try {
     // create a config to send the auth token

     //   we are finding the token from localstorage
     let auth = localStorage.getItem("token");

     //console.log(auth);
     // make sure the axios request should be  synchronous
     await axios
       .get("http://localhost:5000/customer/getcustomer", {
         headers: {
           Authorization: "Bearer " + auth,
         },
       })
       .then((res) => {
         console.log(res);
         SetData(res.data);
         setError(null);
       });
   } catch (error) {
     setError(error);
   }
 };

  return (
    <>
      <h2 align="center" className="product">Buyer Data Table</h2>
      <div style={{ textAlign: "right", marginRight: "30px" }}>
        <Button variant="contained" onClick={handle_navigate}>
          Add Buyer
        </Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "300px", marginTop: "30px" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                CustomerId
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                Phone
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                CustomerName
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                Email
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                ProductName
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                Address
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                Country
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                State
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                Pincode
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                {" "}
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ele, id) => {
              return (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-chid th": { border: 0 } }}
                >
                  <TableCell align="center"> {ele._id}</TableCell>
                  <TableCell align="center"> {ele.phone}</TableCell>
                  <TableCell align="center"> {ele.name}</TableCell>
                  <TableCell align="center"> {ele.email}</TableCell>
                  <TableCell align="center"> {ele.productName}</TableCell>
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
      {/*  Update modal  */}
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
                    <Typography variant="h5">Customer Info Update</Typography>
                  </Grid>
                  <Grid align="center">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label=" Customername"
                        name="name"
                        onChange={handleChange}
                        value={updateData.name}
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
                        label="Email"
                        style={inputStyle}
                        name="email"
                        onChange={handleChange}
                        value={updateData.email}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Product"
                        style={inputStyle}
                        name="productName"
                        onChange={handleChange}
                        value={updateData.productName}
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
                        label="Pincode"
                        style={inputStyle}
                        name="pincode"
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
};

export default BuyerTable;
