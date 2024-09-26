import React from 'react';
import { Box, Toolbar, Container, Grid, Paper } from '@mui/material';
import SideMenu from './SideMenu';
import Header from './Header';
import { Chart } from 'react-google-charts';

const Dashboard = () => {
  const complaintStatusData = [
    ["Status", "Number"],
    ["Resolved", 10],
    ["In Progress", 5],
    ["Pending", 3],
    ["Escalated", 2],
  ];

  const complaintCategoryData = [
    ["Category", "Number"],
    ["Teacher Issue", 8],
    ["Learning Material", 3],
    ["Behavior Issue", 4],
    ["Other", 5],
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
    <Box sx={{ display: 'flex' }}>
      {/* Side Menu */}
      <SideMenu />
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
              <Paper elevation={3} sx={{ padding: 2 }}>
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
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={complaintCategoryData}
                  options={{
                    title: 'Complaint Categories',
                    pieHole: 0.4,
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 3: Complaint Timeline */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
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
  );
};

export default Dashboard;
