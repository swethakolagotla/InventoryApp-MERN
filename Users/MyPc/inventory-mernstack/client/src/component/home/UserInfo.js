import React,{useState,useEffect} from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Button } from "@mui/material";
import { useParams } from 'react-router-dom';
const UserInfo = () => {
const [user,setUser]=useState([]);
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [error, setError] = useState(null);
 const [updateData, SetUpdateData] = useState({
   name: "",
   phone: "",
   email: "",
   address: "",
   state: "",
   country: "",
 });
   const handleChange = (e) => {
     SetUpdateData({ ...updateData, [e.target.name]: e.target.value });
   };
   let { id } = useParams();
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

    const WAIT_TIME = 500;
    // axios request for getting product Detail info
    useEffect(() => {
      const id = setInterval(() => {
        getdata();
      }, WAIT_TIME);
      return () => clearInterval(id);
    }, [updateData]);
    //we are finding token from localstorage
    var auth = localStorage.getItem("token");

    const getdata = async () => {
      try {
        await axios
          .get( `http://localhost:5000/api/getuser/${id}` , {
            headers: {
              Authorization: "Bearer " + auth,
            },
          })
          .then((res) => {
            //console.log(res.data);
            setUser(res.data);
            setError(null);
          });
      } catch (error) {
        setError(error);
      }
    }; 

    const update_btn = (ele) => {
      handleOpen();
      SetUpdateData(ele);
    };
   
    const handle_delete = (id) => {
      axios
        .delete(`http://localhost:5000/api/deleteuser/${id}`, {
          headers: {
            Authorization: "Bearer " + auth,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    };
    const update_submit = (id) => {
      console.log(id);
      axios
        .patch(
          `http://localhost:5000/api/updateuser/${id}`,
          updateData,
          {
            headers: {
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          handleClose();
        });
    };
  return (
    <>
      <h1 className="product">UserInformation</h1>
      <TableContainer
        // component={Paper}
        sx={{ maxHeight: "300px", marginTop: "30px" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "grey",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                UserId
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "grey",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                UserName
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "grey",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                align="center"
              >
                Phone
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "grey",
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
                  backgroundColor: "grey",
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
                  backgroundColor: "grey",
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
                  backgroundColor: "grey",
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
                  backgroundColor: "grey",
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
            {user.map((ele, id) => {
              return (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-chid th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white", fontSize: "18px" }}
                    align="center"
                  >
                    {" "}
                    {ele._id}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.name}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.phone}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.email}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.address}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.country}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {" "}
                    {ele.state}
                  </TableCell>

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
                    <PersonOutlineIcon style={avatarStyle} />
                    <Typography variant="h5">User Info Update</Typography>
                  </Grid>
                  <Grid align="center">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="username"
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
                        label="Address"
                        style={inputStyle}
                        name="address"
                        onChange={handleChange}
                        value={updateData.address}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Country"
                        style={inputStyle}
                        name="country"
                        onChange={handleChange}
                        value={updateData.country}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="State"
                        style={inputStyle}
                        name="state"
                        onChange={handleChange}
                        value={updateData.state}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginRight: "10px" }}
                      onClick={() => update_submit(updateData._id)}
                    >
                      Update userdata
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

export default UserInfo