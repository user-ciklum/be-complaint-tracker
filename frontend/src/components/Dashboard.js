
import React, { createContext, useState } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import Header from './Header';
import ComplaintForm from './ComplaintForm';
import ChartView from './ChartView';
import GridView from './GridView';
import DetailView from './DetailView';
export const CommonContext = createContext();

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

  const handleRaiseComplaint = () => {
    console.log('in');
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  let contextValues = {
    viewClickHandler,
    handleRaiseComplaint,
    setOpen
  };
  
  return (
    <CommonContext.Provider value={contextValues}>
      <Box sx={{ display: 'flex', marginTop: '-40px' }}>
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
        <ComplaintForm open={open} onClose={handleClose} />
      </Box>
    </CommonContext.Provider>
  );
};

export default Dashboard;