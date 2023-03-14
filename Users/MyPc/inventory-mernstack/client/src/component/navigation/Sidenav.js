import React from 'react'
import { List, Box, ListItem,ListItemText,Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from '@mui/icons-material/Sell';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navigate, useNavigate } from 'react-router-dom';


const Sidenav = () => {
  const sideBar = { height: "100Vh", width: "20Vw", border: "1px solid #10043b", backgroundColor: "#10043b", postion: "fixed",  marginTop: "64px", overflow:"scroll", flex:"3.5",}
  const icons = { color: "#24ffc8", margin: "4px" }
const navigate = useNavigate()
 const logout_btn = () =>{
   localStorage.removeItem("token")
   navigate('/')
 }

  return (
    <Box style={sideBar}>
      <List>
        <ListItemButton key="Dashboard" style={icons}>
          <DashboardIcon style={icons} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton key="Sell" style={icons}>
          <SellIcon style={icons} />
          <ListItemText primary="Sell" />
        </ListItemButton>

        <ListItemButton ListItem button key="Stock" style={icons}>
          <Inventory2Icon style={icons} />
          <ListItemText primary="Stock" />
        </ListItemButton>

        <ListItemButton key="Invoice" style={icons}>
          <DescriptionIcon style={icons} />
          <ListItemText primary="Invoice" />
        </ListItemButton>

        <ListItemButton key="Logout" style={icons} onClick={logout_btn}>
          <LogoutIcon style={icons} onClick={logout_btn} />
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidenav