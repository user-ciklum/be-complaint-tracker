import React, {useState, useEffect} from 'react';
import { Box, Toolbar, Container, Grid2, Paper } from '@mui/material';
import Header from './Header';
import { Chart } from 'react-google-charts';
// import { Button } from '@mui/material';
import CommonService from './Common.Service';

const ChartView = (props) => {
  let { viewClickHandler, allComplaints } = props;
  const [chartDataList, setChartDataList] = useState([]);

  useEffect(() => {
    let chartDetails = CommonService.getChartDetailsByCategories(allComplaints);
    setChartDataList(chartDetails);
  }, [allComplaints]);

  const clickHandler = (event, chartType) => {
    event && event.preventDefault();
    viewClickHandler("grid", chartType);
  };

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
          {!!chartDataList.length && <Grid2 container spacing={3}>
              {/* Chart 1: Complaint Status */}
              <Grid2 item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }} onClick={(event) => clickHandler(event, "chart1")}>
                  <Chart
                    chartType="PieChart"
                    data={CommonService.getDataByKey(chartDataList, "status", "data")}
                    options={{
                      title: CommonService.getDataByKey(chartDataList, "status", "label"),
                      pieHole: 0.4,
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid2>

              {/* Chart 2: Complaint Categories */}
              <Grid2 item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }} onClick={(event) => clickHandler(event, "chart2")}>
                  <Chart
                    chartType="ColumnChart"
                    data={CommonService.getDataByKey(chartDataList, "complaintType", "data")}
                    options={{
                      title: CommonService.getDataByKey(chartDataList, "complaintType", "label"),
                      vAxis: {
                        title: 'Number of Complaints',
                      },
                      hAxis: {
                        title: 'Categories',
                      },
                      colors: ['#ff9999', '#66b3ff', '#99ff99'], // Customize colors
                      legend: { position: 'none' }, // Hide legend if not needed
                    }}
                    width="100%"
                    height="300px"
                  />

                </Paper>
              </Grid2>

              {/* Chart 3: Complaint Timeline
            <Grid2 item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer'}} onClick={(event) => clickHandler(event, "chart3")}>
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
            </Grid2>

            {/* Chart 4: Complaint Resolution
            <Grid2 item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }}>
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
            </Grid2> */}

              {/* Chart 5: Urgency Levels */}
              <Grid2 item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }}>
                  <Chart
                    chartType="PieChart"
                    data={CommonService.getDataByKey(chartDataList, "criticality", "data")}
                    options={{
                      title: CommonService.getDataByKey(chartDataList, "criticality", "label"),
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid2>

              {/* Chart 6: Assigned Complaints */}
              
              <Grid2 item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }}>
                  <Chart
                    chartType="PieChart"
                    data={CommonService.getDataByKey(chartDataList, "assignedType", "data")}
                    options={{
                      title: CommonService.getDataByKey(chartDataList, "assignedType", "label"),
                      pieHole: 0.4,
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid2>
            </Grid2>
          }
        </Container>
      </Box>
    </Box>
    
    </div>
  );
};

export default ChartView;
