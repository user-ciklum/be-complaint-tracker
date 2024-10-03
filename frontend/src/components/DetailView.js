import React, { useContext, useState } from 'react';
import { Container, Paper, Typography, Button, Box} from '@mui/material';
import RespondForm from './RespondForm';
import { Reply, ArrowBack, Description } from '@mui/icons-material';
import { Info } from '@mui/icons-material';
import CommonService from './Common.Service';
import { CommonContext } from './Dashboard';

const displayStatuses = { New: "New", Inprogress: "In progress", Closed: "Closed" };

const DetailView = (props) => {
  const commonContext = useContext(CommonContext);
  let { viewClickHandler, chartType, selectedDetail } = props;
  const [open, setOpen] = useState(false);

  const viewBackClickHandler = (event) => {
    event && event.preventDefault();
    viewClickHandler("grid", chartType);
  };

  const respondClickHandler = (event) => {
    event && event.preventDefault();
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        marginTop: '16px',
        background: 'white',
        justifyContent: 'center', // Center horizontally
        minHeight: '400px', // Full height of the viewport
      }}
    >
      <Paper elevation={3} sx={{ width: '60%', padding: 3, borderRadius: '16px' }}>
        <div style={{ padding: '0px 20px', display: 'flex', justifyContent: 'center' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#666' }}>
            <tbody>
              {/* First Row */}
              <tr>
                <td colSpan="2" style={{ padding: '10px', textAlign: 'left' }}>
                <Box display="flex" alignItems="center">
                  <Info sx={{ color: '#F4BB44', fontSize: 24, marginRight: 1 }} /> {/* Blue color for summary */}
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Summary
                  </Typography>
                </Box>
                </td>
              </tr>

              {/* Second Row */}
              <tr>
                <td style={{ padding: '10px' }}>
                  <strong>Complaint ID:</strong> {selectedDetail.id}
                </td>
                <td style={{ padding: '10px' }}>
                  <strong>Date Submitted:</strong> {selectedDetail.createdOnDate}
                </td>
              </tr>

              {/* Third Row */}
              <tr>
                <td style={{ padding: '10px' }}>
                  <strong>Complainant:</strong> {CommonService.getUserNameById(commonContext?.allUsers, selectedDetail.createdBy)}
                </td>
                <td style={{ padding: '10px' }}>
                  <strong>Status:</strong> {displayStatuses[selectedDetail?.status]}
                </td>
              </tr>

              {/* Fourth Row */}
              <tr>
                <td colSpan="2" style={{ padding: '14px', textAlign: 'left', paddingTop: '30px' }}>
                <Box display="flex" alignItems="center">
                  <Description sx={{ color: '#F4BB44', fontSize: 24, marginRight: 1 }} /> {/* Orange color for details */}
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Details
                  </Typography>
                </Box>
                </td>
              </tr>

              {/* Fifth Row */}
              <tr>
                <td colSpan='2' style={{ padding: '0px 14px' }}>
                  <strong>Description:</strong> {selectedDetail.description}
                </td>
              </tr>

              {/* Sixth Row */}
              <tr >
                <td colSpan='2' style={{ padding: '14px' }}>
                  <strong>Resolution:</strong> {selectedDetail.resolution}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Button Section Below the Table */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="outlined"
            onClick={viewBackClickHandler}
            sx={{
              borderRadius: '14px', // Adjust the border radius for larger corners
              padding: '8px 16px', // You can adjust the padding if needed
              borderColor: '#ccc', // Set the border color to gray
              '&:hover': {
                borderColor: '#d3d3d3', // Change the border color on hover for better UX
              },
              minWidth: '80px', // Set a minimum width to help align the icon and text
            }}
            startIcon={<ArrowBack />} // Add the back icon to the button
          >
            Back
          </Button>

          {selectedDetail?.status != "Closed" && <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={respondClickHandler}
            sx={{ mpadding: '16px 16px', borderRadius: '12px', height: '40px' }}
          >
            {<Reply />} &nbsp;&nbsp;Respond&nbsp;&nbsp;
          </Button>}
        </div>

        <RespondForm
          open={open}
          onClose={handleClose}
          selectedComplaint={selectedDetail}
          viewBackClickHandler={viewBackClickHandler}
        />
      </Paper>
    </Container>
  );
};

export default DetailView;
