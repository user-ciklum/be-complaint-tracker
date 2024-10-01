import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio
} from '@mui/material';
import {NotInterested, Check} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const complaintsToOptionsNonStudentRole = ['Teacher', 'Student', 'Management'];
const complaintsToOptionsStudentRole = ['Teacher', 'Management'];
const severities = ['High', 'Moderate', 'Low'];

const fakeData = {
  'Student': Array.from({ length: 50 }, (_, i) => `Student ${i + 1}`),
  'Transport': Array.from({ length: 30 }, (_, i) => `Bus Route ${i + 1} - Driver ${i + 1}`),
  'Teacher': Array.from({ length: 25 }, (_, i) => `Teacher ${i + 1}`),
  'Management': Array.from({ length: 16 }, (_, i) => `Management Member ${i + 1}`),
};

const ComplaintForm = ({open, onClose}) => {
  const [severity, setSeverity] = useState('');
  const [selectedComplaintTo, setSelectedComplaintTo] = useState('');
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState('');
  const [selectedAssignToRole, setSelectedAssignToRole] = useState('');
  const [selectedAssignToRoleDetail, setSelectedAssignToRoleDetail] = useState('');

  const userRole = 'student';
  const assignToFieldsBasedOnUserRole = userRole === 'student' ? complaintsToOptionsStudentRole : complaintsToOptionsNonStudentRole

  const clearForm = () => {
    setSeverity("");
    setSelectedComplaintTo("");
    setSelectedComplaintDetail("");
    setSelectedAssignToRole("");
    setSelectedAssignToRoleDetail("");
  };

  const closeClickHandler = () => {
    onClose && onClose();
    clearForm();
  };

  return (
    <>
      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={closeClickHandler} fullWidth maxWidth="sm">
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={severities}
            value={severity}
            onChange={(e, value) => setSeverity(value)}
            renderInput={(params) => (
              <TextField {...params} label="Severity" variant="outlined" margin="normal" />
            )}
            fullWidth
          />

          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Complaint On</FormLabel>
            <RadioGroup
              row
              value={selectedComplaintTo}
              onChange={(e) => {
                setSelectedComplaintTo(e.target.value);
                // Reset detail selection when complaint to changes
                setSelectedComplaintDetail(''); // Uncomment if needed
              }}
            >
              {['Teacher', 'Student', 'Transport', 'Management'].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Dynamic Detail Dropdown Based on Complaint On */}
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

          {/* Assign To Role */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Assign to:</FormLabel>
            <RadioGroup
              row // This makes the radio buttons align horizontally
              value={selectedAssignToRole}
              onChange={(e) => {
                setSelectedAssignToRole(e.target.value);
              }}
            >
              {assignToFieldsBasedOnUserRole.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Assign To */}
         {/* Dynamic Detail Dropdown Based on Complaint To */}
         {selectedAssignToRole && (
            <Autocomplete
              options={fakeData[selectedAssignToRole] || []}
              value={selectedAssignToRoleDetail}
              onChange={(e, value) => setSelectedAssignToRoleDetail(value)}
              renderInput={(params) => (
                <TextField {...params} label={`Select ${selectedAssignToRole}`} variant="outlined" margin="normal" />
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
          {/* <Button onClick={closeClickHandler} color="secondary">Cancel</Button>
          <Button onClick={closeClickHandler} color="primary">Complaint</Button> */}
          <Button
            variant="outlined"
            onClick={closeClickHandler}
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
              onClick={closeClickHandler}
              sx={{ mpadding: '16px 16px', borderRadius: '12px', height: '40px'}}
              >
              {<Check />} &nbsp;&nbsp;Complaint&nbsp;&nbsp;
          </Button>          
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComplaintForm;
