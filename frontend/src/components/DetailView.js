import React, {useState} from 'react';
import { Container, Grid2, Paper, Typography } from '@mui/material';
import RespondForm from './RespondForm';

const DetailView = (props) => {
  let { viewClickHandler, chartType, selectedDetail } = props;
  const [open, setOpen] = useState(false);

  const viewBackClickHandler = (event) => {
    event && event.preventDefault();
    console.log(chartType);
    viewClickHandler("grid", chartType);
  };

  const respondClickHandler = (event) => {
    event && event.preventDefault();
    console.log("reply");
    setOpen(true)
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  const ComplaintDetails = () => {
    return (
      <div style={{ padding: '20px' }}>
        <Grid2 container spacing={2}>
          {/* Left Column: Complaint Summary */}
          <Grid2 item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Complaint Summary
              </Typography>
              <Typography variant="body1">
                <strong>Complaint ID:</strong> {selectedDetail.id}
              </Typography>
              <Typography variant="body1">
                <strong>Date Submitted:</strong> {selectedDetail.createdOn}
              </Typography>
              <Typography variant="body1">
                <strong>Complainant:</strong> {selectedDetail.createdBy}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedDetail.status}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Complaint Details
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedDetail.reason}
              </Typography>
              <Typography variant="body1">
                <strong>Resolution:</strong> {selectedDetail.resolution}
              </Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </div>
    );
  };

  return (
    <Container>
      {ComplaintDetails()}
      <button onClick={viewBackClickHandler}>Back</button>
      <button onClick={respondClickHandler}>Respond</button>
      <RespondForm open={open} onClose={handleClose} />
    </Container>
    
  );
};

export default DetailView;