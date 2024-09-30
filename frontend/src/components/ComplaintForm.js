import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Box
} from '@mui/material';
import {
  Home, Report, Warning, Assessment, Add
} from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const colleges = ['College 1', 'College 2', 'College 3', 'College 4', 'College 5', 'College 6', 'College 7', 'College 8', 'College 9', 'College 10'];
const complaintsToOptions = ['Teacher', 'Student', 'Transport', 'Management']
  const complaintsToOptionsNonStudentRole = ['Teacher', 'Student', 'Management']
  const complaintsToOptionsStudentRole = ['Teacher', 'Management']

const severities = ['High', 'Moderate', 'Low']

const fakeData = {
  'Student': Array.from({ length: 50 }, (_, i) => `Student ${i + 1}`),
  'Transport': Array.from({ length: 30 }, (_, i) => `Bus Route ${i + 1} - Driver ${i + 1}`),
  // 'Library': Array.from({ length: 20 }, (_, i) => `Librarian ${i + 1}`),
  'Teacher': Array.from({ length: 25 }, (_, i) => `Teacher ${i + 1}`),
  'Management': Array.from({ length: 16 }, (_, i) => `Management Member ${i + 1}`),
  // 'Staff/Co-workers': Array.from({ length: 20 }, (_, i) => `Staff/Co-worker ${i + 1}`)
};

const ComplaintForm = ({open, onClose}) => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [severity, setSeverity] = useState('');

  const [selectedComplaintTo, setSelectedComplaintTo] = useState('');
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState('');
  const [selectedAssignToRole, setSelectedAssignToRole] = useState('');
  const [selectedAssignTo, setSelectedAssignTo] = useState('');
  const [selectedAssignToRoleDetail, setSelectedAssignToRoleDetail] = useState('');


  const userRole = 'parent';
  const assignToFieldsbasedOnUserRole = userRole === 'student' ? complaintsToOptionsStudentRole : complaintsToOptionsNonStudentRole
 

  return (
    <>
      {/* Dialog for Raising Complaint */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Severity</InputLabel>
            <Select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              {severities.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>   

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
              {assignToFieldsbasedOnUserRole.map((option) => (
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
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={onClose} color="primary">Complaint</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComplaintForm;
