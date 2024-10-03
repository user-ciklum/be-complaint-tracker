import React, {useState, useEffect} from 'react';
import { Box, Toolbar, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
    <Box sx={{ padding: 4 }}>
      <Container>
        {!!chartDataList.length && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Chart 1: Complaint Status */}
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }} onClick={(event) => clickHandler(event, "chart1")}>
                <Chart
                  chartType="PieChart"
                  data={CommonService.getDataByKey(chartDataList, "status", "data")}
                  options={{
                    title: CommonService.getDataByKey(chartDataList, "status", "label"),
                    titleTextStyle: {
                      fontSize: 14,
                      bold: true
                    },
                    chartArea: { width: '80%' },
                    pieHole: 0.4,
                    legend: {
                      position: "bottom",
                      alignment: "center",
                      textStyle: {
                        color: "#233238",
                        fontSize: 13,
                      },
                    },
                    colors: ["#109618", "#ffbf00", "#0080ff"]
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 2: Complaint Categories */}
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }} onClick={(event) => clickHandler(event, "chart2")}>
                <Chart
                  chartType="ColumnChart"
                  data={CommonService.getDataByKey(chartDataList, "complaintType", "data")}
                  options={{
                    title: CommonService.getDataByKey(chartDataList, "complaintType", "label"),
                    titleTextStyle: {
                      fontSize: 14,
                      bold: true
                    },
                    chartArea: { width: '80%' },
                    vAxis: {
                      title: 'Number of Complaints',
                    },
                    hAxis: {
                      title: 'Categories',
                    },
                    legend: { position: 'none' }, // Hide legend if not needed
                  }}
                  width="100%"
                  height="300px"
                />

              </Paper>
            </Grid>

            {/* Chart 3: Urgency Levels */}
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }}>
                <Chart
                  chartType="PieChart"
                  data={CommonService.getDataByKey(chartDataList, "criticality", "data")}
                  options={{
                    title: CommonService.getDataByKey(chartDataList, "criticality", "label"),
                    titleTextStyle: {
                      fontSize: 14,
                      bold: true
                    },
                    chartArea: { width: '80%' },
                    legend: {
                      position: "bottom",
                      alignment: "center",
                      textStyle: {
                        color: "#233238",
                        fontSize: 13,
                      },
                    },
                    colors: ["#3366cc", "#ff9900", "#dc3912"],
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>

            {/* Chart 4: Assigned Complaints */}              
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }}>
                <Chart
                  chartType="PieChart"
                  data={CommonService.getDataByKey(chartDataList, "assignedType", "data")}
                  options={{
                    title: CommonService.getDataByKey(chartDataList, "assignedType", "label"),
                    titleTextStyle: {
                      fontSize: 14,
                      bold: true
                    },
                    chartArea: { width: '80%' },
                    pieHole: 0.4,
                    legend: {
                      position: "bottom",
                      alignment: "center",
                      textStyle: {
                        color: "#233238",
                        fontSize: 13,
                      },
                    },
                    colors: ["#3366cc", "#ff9900", "#dc3912"],
                  }}
                  width="100%"
                  height="300px"
                />
              </Paper>
            </Grid>
          </Grid>
        }
      </Container>
    </Box>
  );
};

export default ChartView;
