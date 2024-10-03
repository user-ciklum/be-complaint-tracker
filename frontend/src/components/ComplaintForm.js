import React, { useState, useEffect, useContext } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Alert,
} from '@mui/material';
import { NotInterested, Check } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';
import CommonService from './Common.Service';
import CommonApiCallService from './CommonApiCall.Service';
import { CommonContext } from './Dashboard';

const complaintsToOptionsNonStudentRole = ['Student', 'Teacher', 'Management'];
const complaintsToOptionsStudentRole = ['Teacher', 'Management'];
const severities = ['High', 'Moderate', 'Low'];

const ComplaintForm = ({ open, onClose, user, allUsers }) => {
  const commonContext = useContext(CommonContext);
  const [severity, setSeverity] = useState('');
  const [selectedComplaintTo, setSelectedComplaintTo] = useState('');
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState();
  const [selectedAssignToRole, setSelectedAssignToRole] = useState('');
  const [selectedAssignToRoleDetail, setSelectedAssignToRoleDetail] = useState();
  const [complaintDesc, setComplaintDesc] = useState('');
  const [error, setError] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isServiceFailed, setIsServiceFailed] = useState(false);

  const assignToFieldsBasedOnUserRole = user?.role === 'student' ? complaintsToOptionsStudentRole : complaintsToOptionsNonStudentRole;

  // Handle description change with validation
  const handleDescChange = (e) => {
    const value = e.target.value;

    if (value.length < 20) {
      setError('Minimum 20 characters required.');
    } else if (value.length > 500) {
      setError('Maximum 500 characters allowed.');
    } else {
      setError('');
    }
    setComplaintDesc(value);
  };

  // Check if all form fields are filled
  useEffect(() => {
    if (
      severity &&
      selectedComplaintTo &&
      selectedComplaintDetail &&
      selectedAssignToRole &&
      selectedAssignToRoleDetail &&
      complaintDesc.length >= 20 &&
      complaintDesc.length <= 500
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [severity, selectedComplaintTo, selectedComplaintDetail, selectedAssignToRole, selectedAssignToRoleDetail, complaintDesc]);

  const clearForm = () => {
    setSeverity("");
    setSelectedComplaintTo("");
    setSelectedComplaintDetail("");
    setSelectedAssignToRole("");
    setSelectedAssignToRoleDetail("");
    setComplaintDesc("");
  };

  const closeClickHandler = () => {
    onClose && onClose();
    clearForm();
  };

  const addComplaintCallbackHandler = (data) => {
    commonContext && commonContext?.updateAllComplaints(data, true);
    closeClickHandler();
  };
  
  const addComplaintErrorCallbackHandler = () => {
    setIsServiceFailed(true);
  };
    
  const onSubmitHandler = () => {
    setIsServiceFailed(false);
    let complaintOn = selectedComplaintDetail?.value || "";
    let assignedTo = selectedAssignToRoleDetail?.value || "";
      
    let payload = {
      criticality: severity,
      complaintType: selectedComplaintTo.toLowerCase(),
      categoryType: selectedComplaintTo.toLowerCase(),
      complaintOn: complaintOn.toString(),
      assignedTo: assignedTo.toString(),
      assignedType: selectedAssignToRole.toLowerCase(),
      description: complaintDesc,
      createdBy: user.id,
      status: "New",
      inistituteId: user.institute_id.toString(),
      inistituteType: user.institute_type,
    };
    
    CommonApiCallService.addComplaint(payload, addComplaintCallbackHandler, addComplaintErrorCallbackHandler);
  };

  return (
    <Dialog open={open} onClose={closeClickHandler} fullWidth maxWidth="sm">
      <DialogTitle>Create
        {isServiceFailed && (
          <Alert severity="error" sx={{ marginTop: '8px' }}>
            Something went wrong. Please try again.
          </Alert>
        )}
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          options={severities}
          value={severity}
          onChange={(e, value) => setSeverity(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<span>Severity <span style={{ color: 'red' }}>*</span></span>}
              variant="outlined"
              margin="normal"
            />
          )}
          fullWidth
        />

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">
            Complaint On <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          <RadioGroup
            row
            value={selectedComplaintTo}
            onChange={(e) => {
              setSelectedComplaintTo(e.target.value);
              setSelectedComplaintDetail('');
            }}
          >
            {['Student', 'Teacher', 'Management', 'Transport'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {selectedComplaintTo && (
          <Autocomplete
            options={CommonService.getUserListByRole(allUsers, selectedComplaintTo) || []}
            value={selectedComplaintDetail}
            onChange={(e, value) => setSelectedComplaintDetail(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={<span>Select {selectedComplaintTo} <span style={{ color: 'red' }}>*</span></span>}
                variant="outlined"
                margin="normal"
              />
            )}
            fullWidth
          />
        )}

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">
            Assign to: <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          <RadioGroup
            row
            value={selectedAssignToRole}
            onChange={(e) => {
              setSelectedAssignToRole(e.target.value);
              setSelectedAssignToRoleDetail('');
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

        {selectedAssignToRole && (
          <Autocomplete
            options={CommonService.getUserListByRole(allUsers, selectedAssignToRole) || []}
            value={selectedAssignToRoleDetail}
            onChange={(e, value) => setSelectedAssignToRoleDetail(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={<span>Select {selectedAssignToRole} <span style={{ color: 'red' }}>*</span></span>}
                variant="outlined"
                margin="normal"
              />
            )}
            fullWidth
          />
        )}

        <TextField
          label={<span>Complaint Details <span style={{ color: 'red' }}>*</span></span>}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={complaintDesc}
          onChange={handleDescChange}
          error={!!error}
          helperText={error}
          inputProps={{ minLength: 20, maxLength: 500 }}
        />
        <Typography variant="body2" color="textSecondary">
          {complaintDesc.length}/500 characters
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={closeClickHandler}
          startIcon={<NotInterested />}
          sx={{ borderRadius: '14px', padding: '8px 16px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitHandler}
          startIcon={<Check />}
          sx={{ borderRadius: '12px', height: '40px' }}
          disabled={!isFormComplete} // Disable if form is not complete
        >
          Complaint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplaintForm;
