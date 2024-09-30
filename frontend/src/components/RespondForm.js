import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {
  Home, Report, Warning, Assessment, Add
} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const colleges = ['College 1', 'College 2', 'College 3', 'College 4', 'College 5', 'College 6', 'College 7', 'College 8', 'College 9', 'College 10'];
const complaintsToOptions = ['Teacher', 'Student', 'Transport', 'Management']
  const complaintsToOptionsNonStudentRole = ['Teacher', 'Student', 'Management']
  const complaintsToOptionsStudentRole = ['Teacher', 'Management']

const statuses = ['Open', 'Inprogress', 'Closed'];

const RespondForm = ({open, onClose}) => {
  const [status, setStatus] = useState('');


  return (
    <>
      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Respond</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>         
          
          {/* Text Area for Complaint Description */}
          <TextField
            label="Response Details"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 1000 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={onClose} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RespondForm;
