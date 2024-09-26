import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Report, Category, Warning, Notifications, People, Assessment, CalendarToday, Settings, Help } from '@mui/icons-material';

const SideMenu = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Dashboard Overview" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Report /></ListItemIcon>
          <ListItemText primary="View All Complaints" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Category /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Warning /></ListItemIcon>
          <ListItemText primary="Escalations" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Notifications /></ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Assessment /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><CalendarToday /></ListItemIcon>
          <ListItemText primary="Meetings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Help & Support" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
