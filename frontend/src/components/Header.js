import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Home, Report, Logout, Notifications, Help } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Logo */}
        <Typography 
          variant="h6" 
          noWrap 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={() => handleNavigate('/dashboard')} // Change this path as needed
        >
          Complaint Tracker
        </Typography>

        {/* Icons on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Button
          variant="outlined"
          color="inherit"
          sx={{
            borderColor: 'white',
            color: 'white',
            borderRadius: '20px',
            borderStyle: 'dotted',
            marginRight: '10px',
            borderWidth: '3px',
            padding: '6px 16px',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a slight background on hover
            }
          }}
            onClick={() => handleNavigate('/raise-complaint')} // Adjust the path as needed
          >
            Raise Complaint
          </Button>

          
          <span>John P. (Teacher)</span>
          
          {/* User Avatar with Menu */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar alt="User" src="https://randomuser.me/api/portraits/men/10.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigate('/home')}>
              <Home sx={{ marginRight: 1, color: 'blue' }} /> Home
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/add-complaint')}>
              <Report sx={{ marginRight: 1, color: 'blue' }} /> Raise Complaint
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/logout')}>
              <Logout sx={{ marginRight: 1, color: 'blue' }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
