import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import { Home, Report, Feedback, Notifications, Help } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Complaint Tracker
        </Typography>

        {/* Icons on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit"><Home /></IconButton>
          <IconButton color="inherit"><Report /></IconButton>
          <IconButton color="inherit"><Feedback /></IconButton>
          <IconButton color="inherit"><Notifications /></IconButton>
          <IconButton color="inherit"><Help /></IconButton>
          {/* User Avatar */}
          <IconButton color="inherit">
            <Avatar alt="User" src="https://randomuser.me/api/portraits/men/10.jpg" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
