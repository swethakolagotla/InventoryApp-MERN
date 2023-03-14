import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ListItemButton,
} from "@mui/material";
 
import axios from "axios";
import "../../App.css";
import { Link} from "react-router-dom";
const Users = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getdata();
  }, []);
  //axios call for get the user name
  const getdata = async () => {
    try {
      //console.log(auth);
      await axios
        .get("http://localhost:5000/api/getuser", {
          headers: {
            Authorization: "Bearer " + auth,
          },
        })
        .then((res) => {
          console.log(res);
          setUser(res.data);
        });
    } catch (error) {
      setError({ error });
    }
  };
  let auth = localStorage.getItem("token");
 
  
  return (
    <div>
      {" "}
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
                    <Link to={`/userdata/${ele._id}`} className="watch-btn">
                    view Profile
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
