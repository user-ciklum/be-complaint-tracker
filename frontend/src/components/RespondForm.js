import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {NotInterested, Check} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const statuses = ['Open', 'Inprogress', 'Closed'];

const RespondForm = ({open, onClose}) => {
const [status, setStatus] = useState('');
const [response, setResponse] = useState('');
const [error, setError] = useState('');
const [isFormComplete, setIsFormComplete] = useState(false);

const handleChange = (e) => {
  const value = e.target.value;
  setIsFormComplete(false);

  // Check the length of the input
  if (value.length < 20) {
    setError('Minimum 20 characters required.');
  } else if (value.length > 500) {
    setError('Maximum 500 characters allowed.');
  } else {
    setIsFormComplete(true);
    setError(''); // Clear error if input is valid
  }  
  setResponse(value);
  };


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
            value={response}
            onChange={handleChange}
            error={!!error} // Show error state in the text field if error exists
            helperText={error} // Display error message
            inputProps={{ minLength: 20, maxLength: 500 }} // Set the maxLength directly
          />
          <Typography variant="body2" color="textSecondary">
            {response.length}/500 characters
          </Typography>
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
              disabled={!isFormComplete}
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
