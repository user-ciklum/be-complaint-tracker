import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {NotInterested, Check} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const statuses = ['Open', 'Inprogress', 'Closed'];

const RespondForm = ({open, onClose}) => {
const [status, setStatus] = useState('');


  return (
    <>
      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Respond</DialogTitle>
        <DialogContent>        
          <Autocomplete
            options={statuses}
            value={status}
            onChange={(e, value) => setStatus(value)}
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" margin="normal" />
            )}
            fullWidth
          />

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
          {/* <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={onClose} color="primary">Submit</Button> */}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: '14px', // Adjust the border radius for larger corners
              padding: '8px 16px', // You can adjust the padding if needed
              borderColor: '#ccc', // Set the border color to gray
              '&:hover': {
                borderColor: '#d3d3d3', // Change the border color on hover for better UX
              },
              minWidth: '80px', // Set a minimum width to help align the icon and text
            }}
            startIcon={<NotInterested />} // Add the reply icon to the button
          >
            Cancel
          </Button>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClose}
              sx={{ mpadding: '16px 16px', borderRadius: '12px', height: '40px'}}
              >
              {<Check />} &nbsp;&nbsp;Submit&nbsp;&nbsp;
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RespondForm;
