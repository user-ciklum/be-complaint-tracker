import React, { useState } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import Header from './Header';
import ChartView from './ChartView';
import GridView from './GridView';
import DetailView from './DetailView';

const Dashboard = () => {
  const [isShowSelectedView, setIsShowSelectedView] = useState("chart");
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

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

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Header />
        {/* Add Toolbar for space under the fixed AppBar */}
        <Toolbar />
        {/* Content Area */}
        <Container>
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
    </Box>
  );
};

export default Dashboard;
