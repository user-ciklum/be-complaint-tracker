import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ArrowBack } from '@mui/icons-material';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Button,
  Typography,
} from '@mui/material';



const initialRows = [
  { id: 1, createdBy: 'user1', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'This is a longer description that might need truncating.', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 2, createdBy: 'user3', createdOn: '09/02/23', updatedBy: 'user4', updatedOn: '09/06/23', status: 'pending', description: 'Short desc.', resolution: 'bla bla bla', remainder: 2, criticality: 'medium' },
  { id: 3, createdBy: 'user5', createdOn: '09/03/23', updatedBy: 'user6', updatedOn: '09/07/23', status: 'closed', description: 'This is another long description that will be truncated.', resolution: 'resolved', remainder: 3, criticality: 'high' },
 
  { id: 1, createdBy: 'user1', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'This is a longer description that might need truncating.', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 2, createdBy: 'user3', createdOn: '09/02/23', updatedBy: 'user4', updatedOn: '09/06/23', status: 'pending', description: 'Short desc.', resolution: 'bla bla bla', remainder: 2, criticality: 'medium' },
  { id: 3, createdBy: 'user5', createdOn: '09/03/23', updatedBy: 'user6', updatedOn: '09/07/23', status: 'closed', description: 'This is another long description that will be truncated.', resolution: 'resolved', remainder: 3, criticality: 'high' },
 
  { id: 1, createdBy: 'user1', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'This is a longer description that might need truncating.', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 2, createdBy: 'user3', createdOn: '09/02/23', updatedBy: 'user4', updatedOn: '09/06/23', status: 'pending', description: 'Short desc.', resolution: 'bla bla bla', remainder: 2, criticality: 'medium' },
  { id: 3, createdBy: 'user5', createdOn: '09/03/23', updatedBy: 'user6', updatedOn: '09/07/23', status: 'closed', description: 'This is another long description that will be truncated.', resolution: 'resolved', remainder: 3, criticality: 'high' },
  // Add more rows as needed
];

const GridView = (props) => {
  let { viewClickHandler } = props;
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('');

  const viewBackClickHandler = (event) => {
    event && event.preventDefault();
    console.log("grid detail");
    viewClickHandler("chart");
  };

  const handleRowClick = (params) => {
    console.log('Row data:', params.row);
    let selectedRow = params?.row;
    viewClickHandler("detail", null, selectedRow);
  };

  const filteredRows = initialRows.filter((row) => {
    return (
      (row.createdBy.includes(filterText) || row.updatedBy.includes(filterText) || row.description.includes(filterText) || row.resolution.includes(filterText)) &&
      (statusFilter ? row.status === statusFilter : true) &&
      (criticalityFilter ? row.criticality === criticalityFilter : true)
    );
  });

  const columns = [
    { field: 'createdBy', headerName: 'Created By User ID', width: 150 },
    { field: 'createdOn', headerName: 'Created On', width: 120 },
    { field: 'updatedBy', headerName: 'Updated By User ID', width: 150 },
    { field: 'updatedOn', headerName: 'Updated On', width: 120 },
    { field: 'status', headerName: 'Status', width: 100 }, // Decreased width
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 150, // Decreased width
      renderCell: (params) => {
        const maxLength = 25; // Set the maximum length for description to 25 characters
        return (
          <div>
            {params.value.length > maxLength ? `${params.value.substring(0, maxLength)}...` : params.value}
          </div>
        );
      }
    },
    { field: 'resolution', headerName: 'Resolution', width: 150 }, // Decreased width
    { field: 'remainder', headerName: 'Remainder', width: 100 }, // Decreased width
    { field: 'criticality', headerName: 'Criticality', width: 130 },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant="outlined"
        onClick={viewBackClickHandler}
        sx={{
          borderRadius: '14px',
          padding: '8px 16px',
          borderColor: '#ccc',
          '&:hover': {
            borderColor: '#d3d3d3',
          },
          minWidth: '80px',
        }}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: '16px', marginTop: '20px', backgroundColor: '#fafafa' }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Complaint Management
        </Typography>
        <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{
              width: '300px',
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#b0b0b0',
                },
              },
            }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}>
            <InputLabel>Criticality</InputLabel>
            <Select
              value={criticalityFilter}
              onChange={(e) => setCriticalityFilter(e.target.value)}
              label="Criticality"
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ minHeight: '300px', width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            pagination
            rowsPerPageOptions={[5, 10, 25]} // Added more rows per page options
            autoHeight
            sx={{
              borderRadius: '8px',
              '& .MuiDataGrid-cell': {
                border: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#e0e0e0',
                borderRadius: '8px 8px 0 0',
              },
              '& .MuiDataGrid-footerCell': {
                border: 'none',
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9', // Lighter background color for odd rows
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f1f1f1', // Lighter background color for even rows
              },
              minHeight: '300px', // Minimum height for the table body
            }}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default GridView;
