import React from 'react';
import { Container, Grid2, Paper } from '@mui/material';
import { Chart } from 'react-google-charts';

const ChartView = (props) => {
  let { viewClickHandler } = props;

  const clickHandler = (event, chartType) => {
    event && event.preventDefault();
    console.log(chartType);
    viewClickHandler("grid", chartType);
  };

  // Sample data for the Pie Chart
  const data = [
    ["Status", "Number"],
    ["Resolved", 10],
    ["In Progress", 5],
    ["Pending", 3],
    ["Escalated", 2],
  ];

  const data2 = [
    ["Category", "Number"],
    ["Teacher Issue", 8],
    ["Learning Material", 3],
    ["Behavior Issue", 4],
    ["Other", 5],
  ];
  
   // Data for the bar chart
  const data3 = [
    ["City", "2010 Population", "2020 Population"],
    ["New York City, NY", 8175000, 8337000],
    ["Los Angeles, CA", 3792000, 3898000],
    ["Chicago, IL", 2695000, 2716000],
    ["Houston, TX", 2099000, 2328000],
    ["Phoenix, AZ", 1445000, 1681000],
  ];

  // Options to customize the chart
  const options = {
    title: "My Daily Activities",
    is3D: true,   // Optional: To make it a 3D pie chart
  };

  // Customization options for the donut chart
  const options2 = {
    title: "My Daily Activities 1",
    pieHole: 0.4,   // Creates the hole in the middle for the donut chart
    is3D: false,    // Optional: Set to true if you want a 3D appearance
    slices: [
      { color: "#2BB673" },
      { color: "#d91e48" },
      { color: "#007fad" },
      { color: "#e9a227" }
    ],
    legend: {
      position: "bottom",
    }
  };

    // Options to customize the bar chart
  const options3 = {
    chart: {
      title: "Population of Largest U.S. Cities",
      subtitle: "Population comparison between 2010 and 2020",
    },
    bars: 'vertical', // Can be set to 'horizontal' for horizontal bar chart
    colors: ['#1b9e77', '#d95f02'],
    hAxis: {
      title: 'Population',
    },
    vAxis: {
      title: 'City',
    },
  };

  return (<div className="col row">
    <div className="col6">
      <div style={{ margin: '50px' }}
      onClick={(event) => clickHandler(event, "chart1")}
      >
        <Chart
          chartType="PieChart"
          width="500px"
          height="300px"
          data={data}
          options={options}
        />
      </div>
    </div>

    <div className="col6">
      <div style={{ margin: '50px' }}
      onClick={(event) => clickHandler(event, "chart2")}
      >
        <Chart
          chartType="PieChart"
          width="500px"
          height="300px"
          data={data2}
          options={options2}
        />
      </div>
    </div>

    <div className="col6">
      <div style={{ margin: '50px' }}
      onClick={(event) => clickHandler(event, "chart3")}
      >
        <Chart
          chartType="Bar"
          width="500px"
          height="300px"
          data={data3}
          options={options3}
        />
      </div>
    </div>
  </div>
  );
}

export default ChartView;
