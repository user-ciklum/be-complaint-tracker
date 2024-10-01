import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Home, Report, Logout, Notifications, Help } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from './Dashboard';
import { Edit } from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const commonContext = useContext(CommonContext);

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

  const viewDashboardClickHandler = (event) => {
    event && event.preventDefault();
    commonContext && commonContext?.viewClickHandler("chart");
  };

  const raiseComplaintClickHandler = (event) => {
    event && event.preventDefault();
    commonContext && commonContext?.handleRaiseComplaint();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Logo */}
        <Typography 
          variant="h6" 
          noWrap 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={viewDashboardClickHandler} // Change this path as needed
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
            onClick={raiseComplaintClickHandler} // Adjust the path as needed
          >
            <Edit /> &nbsp;&nbsp;Raise Complaint
          </Button>

          
          <span>John P. (Teacher)</span>
          
          {/* User Avatar with Menu */}
          <IconButton color="inherit" onClick={handleMenuClick}>
          <Avatar alt="User" src="/assets/user-icon.png" sx={{ width: 32, height: 32 }} />

          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={viewDashboardClickHandler}>
              <Home sx={{ marginRight: 1, color: 'blue' }} /> Home
            </MenuItem>
            <MenuItem onClick={raiseComplaintClickHandler}>
              <Edit sx={{ marginRight: 1, color: 'blue' }} /> Raise Complaint
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/')}>
              <Logout sx={{ marginRight: 1, color: 'blue' }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
