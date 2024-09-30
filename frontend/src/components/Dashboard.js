
import React, { useState } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import Header from './Header';
import ComplaintIcon from '@mui/icons-material/ReportProblem'; // Using ReportProblem as a complaint icon
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import ComplaintForm from './ComplaintForm';
import ChartView from './ChartView';
import GridView from './GridView';
import DetailView from './DetailView';

const Dashboard = () => {
  const [isShowSelectedView, setIsShowSelectedView] = useState("chart");
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [open, setOpen] = useState(false);


  const viewClickHandler = (selectedView, chartType, selectedRow) => {
    console.log(selectedView, " : ", chartType);
    setIsShowSelectedView(selectedView);
    !!chartType && setSelectedChart(chartType);
    !!selectedRow?.id && setSelectedDetail(selectedRow);
    if (selectedView === "chart") {
      setSelectedChart(null);
      setSelectedDetail(null);
    }
  };

  const FixedButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    borderRadius: '20px', // Rounded corners
    padding: theme.spacing(1, 2),
  }));

  const handleRaiseComplaint = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Header />
        {/* Add Toolbar for space under the fixed AppBar */}
        <Toolbar />
        {/* Content Area */}
        <Container maxWidth="lg" style={{minWidth: '100%'}}>
          {isShowSelectedView === "chart" && <ChartView viewClickHandler={viewClickHandler} />}
          {isShowSelectedView === "grid" && <GridView viewClickHandler={viewClickHandler} />}
          {isShowSelectedView === "detail" &&
            <DetailView
            viewClickHandler={viewClickHandler}
            chartType={selectedChart}
            selectedDetail={selectedDetail}
          />}
        </Container>
      </Box>
      <FixedButton variant="contained"
      color="primary"
      onClick={handleRaiseComplaint}
      startIcon={<ComplaintIcon />}
      >
        Raise Complaint
    </FixedButton>
    <ComplaintForm open={open} onClose={handleClose} />
    </Box>
  );
};

export default Dashboard;