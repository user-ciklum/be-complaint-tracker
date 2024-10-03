import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Alert,
  Paper,
} from '@mui/material';
import {NotInterested, Check} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';
import CommonApiCallService from './CommonApiCall.Service';
import { CommonContext } from './Dashboard';
import CommonService from './Common.Service';

const statuses = ['New', 'Inprogress', 'Closed'];

const RespondForm = ({ open, onClose, selectedComplaint, viewBackClickHandler }) => {
  const commonContext = useContext(CommonContext);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isServiceFailed, setIsServiceFailed] = useState(false);
  
  useEffect(() => {
    setStatus(selectedComplaint?.status || "");
  }, [selectedComplaint]);

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

  const updateComplaintCallbackHandler = (data) => {
    commonContext && commonContext?.updateAllComplaints(data);
    viewBackClickHandler && viewBackClickHandler();
    onClose && onClose();
  };
  
  const updateComplaintErrorCallbackHandler = () => {
    setIsServiceFailed(true);
  };
    
  const onSubmitHandler = () => {
    let user = commonContext && commonContext?.user;
    setIsServiceFailed(false);
    let payload = {
      id: selectedComplaint?.id,
      status: status,
      resolution: response,
      updatedBy: user?.id,
    };
    
    CommonApiCallService.updateComplaints(payload, updateComplaintCallbackHandler, updateComplaintErrorCallbackHandler);
  };

  return (
    <>
      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Respond
          {isServiceFailed && (
            <Alert severity="error" sx={{ marginTop: '8px' }}>
              Something went wrong. Please try again.
            </Alert>
          )}
        </DialogTitle>
        <DialogContent>
          Complainant : <strong>{CommonService.getUserNameById(commonContext?.allUsers, selectedComplaint.createdBy)}</strong>

          {/* Text Area for Complaint Description */}
          <TextField
            label="Description"
            readOnly
            multiline
            rows={3}
            fullWidth
            disabled
            margin="normal"
            value={selectedComplaint?.description || ""}  
          />
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
              onClick={onSubmitHandler}
              disabled={!isFormComplete}
            sx={{
              padding: '16px 16px',
              borderRadius: '12px',
              height: '40px'
            }}
              >
              {<Check />} &nbsp;&nbsp;Submit&nbsp;&nbsp;
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RespondForm;
