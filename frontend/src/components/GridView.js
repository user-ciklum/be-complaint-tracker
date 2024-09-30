import React from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const GridView = (props) => {
    let { viewClickHandler } = props;

  const viewBackClickHandler = (event) => {
    event && event.preventDefault();
    console.log("grid detail");
    viewClickHandler("chart");
  };

  const columns = [
  {
    field: 'complaintType',
    headerName: 'Complaint To',
    sortable: true,
    flex: 1
  },
  {
    field: 'reason',
    headerName: 'Complaint',
    sortable: false,
    flex: 3
  },
  {
    field: 'assignTo',
    headerName: 'Assign To',
    sortable: true,
    flex: 1
  },
  {
    field: 'createdBy',
    headerName: 'Logged by',
    sortable: false,
    flex: 1
  },
  {
    field: 'createdOn',
    headerName: 'Logged on',
    sortable: true,
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    flex: 1
  },
  {
    field: 'resolution',
    headerName: 'Resolution',
    sortable: false,
    flex: 2
  },
];

const rows = [
  { id: 1, institute_type: "school", complaintType: "student", reason: "Raj took my book", assignTo: "Class teacher", createdBy: "Shree", createdOn: "30-09-2024", status: "open", resolution: "",  },
  { id: 2, institute_type: "school", complaintType: "management", reason: "Class 2nd A is not clean", assignTo: "", createdBy: "Sandeep", createdOn: "28-09-2024", status: "open", resolution: "",  },
  { id: 3, institute_type: "school", complaintType: "transport", reason: "Bus Route 2 driver is not stopping to my stop dropping at signal", assignTo: "Admin",  createdBy: "Shree", createdOn: "15-09-2024", status: "open", resolution: "",  },
  { id: 4, institute_type: "school", complaintType: "teacher", reason: "Ram Sir misbehaved with me", assignTo: "Admin", createdBy: "Rinki", createdOn: "28-09-2024", status: "open", resolution: "",  },
  { id: 5, institute_type: "school", complaintType: "student", reason: "Rajan took my Maths book", assignTo: "Class teacher", createdBy: "Shree", createdOn: "30-09-2024", status: "open", resolution: "",  },
  { id: 6, institute_type: "school", complaintType: "management", reason: "Class 5nd B is not clean", assignTo: "", createdBy: "Sandeep", createdOn: "28-09-2024", status: "open", resolution: "",  },
  { id: 7, institute_type: "school", complaintType: "transport", reason: "Bus Route 5 driver is not stopping to my stop dropping at signal", assignTo: "Admin",  createdBy: "Shree", createdOn: "15-09-2024", status: "open", resolution: "",  },
  { id: 8, institute_type: "school", complaintType: "student", reason: "Rahul misbehaved with me", assignTo: "Class teacher", createdBy: "Rinki", createdOn: "28-09-2024", status: "open", resolution: "",  },
  { id: 9, institute_type: "school", complaintType: "student", reason: "Ramesh took my notebook", assignTo: "Class teacher", createdBy: "Shree", createdOn: "30-09-2024", status: "open", resolution: "",  },
  { id: 10, institute_type: "school", complaintType: "management", reason: "Class 1nd C  toilets are not clean", assignTo: "", createdBy: "Sandeep", createdOn: "28-09-2024", status: "open", resolution: "",  },
  { id: 11, institute_type: "school", complaintType: "transport", reason: "Bus Route 12 driver is not stopping to my stop dropping at signal", assignTo: "Admin",  createdBy: "Shree", createdOn: "15-09-2024", status: "open", resolution: "",  },
];
  
  // Custom function to handle row click
  const handleRowClick = (params) => {
    console.log('Row data:', params.row);
    let selectedRow = params?.row;
    viewClickHandler("detail", null, selectedRow);
  };

  return (
    <Container>
      <button onClick={viewBackClickHandler}>Back</button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
        />
      </Box>
    </Container>
  );
};

export default GridView;
