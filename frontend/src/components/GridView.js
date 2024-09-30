import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
} from '@mui/material';

const initialRows = [
  { id: 1, createdBy: 'user1', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'cccc', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 2, createdBy: 'user2', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'cccc', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 3, createdBy: 'user4', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'cccc', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 4, createdBy: 'user5', createdOn: '09/01/23', updatedBy: 'user2', updatedOn: '09/05/23', status: 'open', description: 'cccc', resolution: 'bla bla bla', remainder: 1, criticality: 'low' },
  { id: 5, createdBy: 'user3', createdOn: '09/02/23', updatedBy: 'user4', updatedOn: '09/06/23', status: 'pending', description: 'cccc', resolution: 'bla bla bla', remainder: 2, criticality: 'medium' },
  // Add more rows as needed
];

const GridView = () => {
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('');

  const filteredRows = initialRows.filter((row) => {
    return (
      (row.createdBy.includes(filterText) || row.updatedBy.includes(filterText) || row.description.includes(filterText) || row.resolution.includes(filterText)) &&
      (statusFilter ? row.status === statusFilter : true) &&
      (criticalityFilter ? row.criticality === criticalityFilter : true)
    );
  });

  const columns = [
    { field: 'createdBy', headerName: 'Created By User ID', width: 'auto' },
    { field: 'createdOn', headerName: 'Created On', width: 'auto' },
    { field: 'updatedBy', headerName: 'Updated By User ID', width: 'auto' },
    { field: 'updatedOn', headerName: 'Updated On', width: 'auto' },
    { field: 'status', headerName: 'Status', width: 'auto' },
    { field: 'description', headerName: 'Description', width: 'auto' },
    { field: 'resolution', headerName: 'Resolution', width: 'auto' },
    { field: 'remainder', headerName: 'Remainder', width: 'auto' },
    { field: 'criticality', headerName: 'Criticality', width: 'auto' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }} style={{width: '100%'}}>
      <Paper sx={{ padding: 3, borderRadius: '16px', backgroundColor: '#fafafa' }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Complaint Management
        </Typography>
        <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
            InputProps={{
              sx: { borderRadius: '8px' },
            }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
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
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
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
        <div style={{ height: 400, width: '100%' }}>
          
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            autoHeight
            autoWidth
            sx={{
              width: '100%', // Ensures DataGrid takes full width
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
              }              
            }}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default GridView;
