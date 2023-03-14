import React from 'react'
import { Box, Typography, IconButton } from '@mui/material/';
import {AccountCircle} from '@mui/icons-material/AccountCircle';

const LeftHeadnav = () => {
    
 
    return (
      <>
   
    <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography variant='h6' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{user}
            </Typography>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"><MoreIcon />

            </IconButton>
            </Box>
            </>
  )
}

export default LeftHeadnav