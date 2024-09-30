import React, {useState} from 'react';
import { Box, Toolbar, Container, Grid, Paper } from '@mui/material';
import Header from './Header';
import { Chart } from 'react-google-charts';
// import { Button } from '@mui/material';

const ChartView = (props) => {
    let { viewClickHandler } = props;
  
  const clickHandler = (event, chartType) => {
    event && event.preventDefault();
    console.log(chartType);
    viewClickHandler("grid", chartType);
   };

  const complaintStatusData = [
    ["Status", "Number"],
    ["Resolved", 10],
    ["In Progress", 5],
    ["Pending", 3],
    ["Escalated", 2],
  ];

  const complaintCategoryData = [
    ['Category', 'Number of Complaints'],
    ['Category 1', 10],
    ['Category 2', 20],
    ['Category 3', 30],
  ];
  

  const complaintTimelineData = [
    ["Day", "Complaints"],
    ["Mon", 5],
    ["Tue", 10],
    ["Wed", 8],
    ["Thu", 4],
    ["Fri", 6],
  ];

  const complaintResolutionData = [
    ["Resolution", "Number"],
    ["Resolved Quickly", 12],
    ["Resolved Late", 5],
    ["Unresolved", 2],
  ];

  const complaintUrgencyData = [
    ["Urgency Level", "Number"],
    ["Low", 10],
    ["Medium", 7],
    ["High", 3],
  ];

  const complaintAssignedToData = [
    ["Assignee", "Number"],
    ["Teacher A", 5],
    ["Teacher B", 7],
    ["Admin", 8],
  ];


  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Header />
        {/* Add Toolbar for space under the fixed AppBar */}
        <Toolbar />
        {/* Content Area */}
        <Container>
          <Grid container spacing={3}>
            {/* Chart 1: Complaint Status */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }} onClick={(event) => clickHandler(event, "chart1")}>
                <Chart
                  chartType="PieChart"
                  data={complaintStatusData}
                  options={{
                    title: 'Complaint Status',
                    pieHole: 0.4,
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 2: Complaint Categories */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }} onClick={(event) => clickHandler(event, "chart2")}>
              <Chart
                chartType="ColumnChart"
                data={complaintCategoryData}
                options={{
                  title: 'Complaint Categories',
                  hAxis: {
                    title: 'Number of Complaints',
                  },
                  vAxis: {
                    title: 'Categories',
                  },
                  colors: ['#ff9999', '#66b3ff', '#99ff99'], // Customize colors
                  legend: { position: 'none' }, // Hide legend if not needed
                }}
                width="100%"
                height="300px"
              />

              </Paper>
            </Grid>

            {/* Chart 3: Complaint Timeline */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }} onClick={(event) => clickHandler(event, "chart3")}>
                <Chart
                  chartType="LineChart"
                  data={complaintTimelineData}
                  options={{
                    title: 'Complaint Timeline (by Day)',
                    hAxis: { title: 'Days of the Week' },
                    vAxis: { title: 'Number of Complaints' },
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 4: Complaint Resolution */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Chart
                  chartType="BarChart"
                  data={complaintResolutionData}
                  options={{
                    title: 'Complaint Resolutions',
                    hAxis: { title: 'Number' },
                    vAxis: { title: 'Resolution Type' },
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 5: Urgency Levels */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={complaintUrgencyData}
                  options={{
                    title: 'Complaint Urgency Levels',
                    pieHole: 0.4,
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 6: Assigned Complaints */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={complaintAssignedToData}
                  options={{
                    title: 'Complaints Assigned To',
                    pieHole: 0.4,
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    
    </div>
  );
};

export default ChartView;
