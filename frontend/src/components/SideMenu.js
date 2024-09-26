import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {
  Home, Report, Warning, Assessment, Add
} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const colleges = ['College 1', 'College 2', 'College 3', 'College 4', 'College 5', 'College 6', 'College 7', 'College 8', 'College 9', 'College 10'];
const complaintsToOptions = [
  'Teacher', 'Student', 'Transport', 'Library', 'Management', 'Staff/Co-workers'
];

const fakeData = {
  'Student': Array.from({ length: 50 }, (_, i) => `Student ${i + 1}`),
  'Transport': Array.from({ length: 30 }, (_, i) => `Bus Route ${i + 1} - Driver ${i + 1}`),
  'Library': Array.from({ length: 20 }, (_, i) => `Librarian ${i + 1}`),
  'Teacher': Array.from({ length: 25 }, (_, i) => `Teacher ${i + 1}`),
  'Management': Array.from({ length: 16 }, (_, i) => `Management Member ${i + 1}`),
  'Staff/Co-workers': Array.from({ length: 20 }, (_, i) => `Staff/Co-worker ${i + 1}`)
};

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedComplaintTo, setSelectedComplaintTo] = useState('');
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState('');

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            <ListItemIcon><Warning /></ListItemIcon>
            <ListItemText primary="Escalations" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{ position: 'absolute', bottom: 20, left: 20 }}
          onClick={handleClickOpen}
        >
          Raise Complaint
        </Button>
      </Drawer>

      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Raise a Complaint</DialogTitle>
        <DialogContent>
          {/* Select School/College */}
          <FormControl fullWidth margin="normal">
            <InputLabel>School/College</InputLabel>
            <Select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              {colleges.map((college) => (
                <MenuItem key={college} value={college}>{college}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Complaint To */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Complaint To</InputLabel>
            <Select
              value={selectedComplaintTo}
              onChange={(e) => {
                setSelectedComplaintTo(e.target.value);
                setSelectedComplaintDetail(''); // Reset detail selection when complaint to changes
              }}
            >
              {complaintsToOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dynamic Detail Dropdown Based on Complaint To */}
          {selectedComplaintTo && (
            <Autocomplete
              options={fakeData[selectedComplaintTo] || []}
              value={selectedComplaintDetail}
              onChange={(e, value) => setSelectedComplaintDetail(value)}
              renderInput={(params) => (
                <TextField {...params} label={`Select ${selectedComplaintTo}`} variant="outlined" margin="normal" />
              )}
              fullWidth
            />
          )}

          {/* Text Area for Complaint Description */}
          <TextField
            label="Complaint Details"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 1000 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleClose} color="primary">Submit Complaint</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SideMenu;
