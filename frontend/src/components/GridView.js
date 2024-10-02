import React, { useContext, useEffect, useState } from 'react';
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
import { CommonContext } from './Dashboard';
import CommonService from './Common.Service';

const GridView = (props) => {
  const commonContext = useContext(CommonContext);
  let { viewClickHandler, allComplaints } = props;
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('');
  const [complaintList, setComplaintList] = useState([]);
  
  useEffect(() => {
    let updatedList = CommonService.getUpdatedComplaintList(commonContext?.allUsers, allComplaints);
    setComplaintList(updatedList);
  }, [allComplaints]);

  const viewBackClickHandler = (event) => {
    event && event.preventDefault();
    viewClickHandler("chart");
  };

  const handleRowClick = (params) => {
    let selectedRow = params?.row;
    viewClickHandler("detail", null, selectedRow);
  };

  const filteredRows = !!complaintList.length && complaintList.filter((row) => {
    return (
      (row?.createdByName?.includes(filterText) || row?.assignedToName?.includes(filterText) || row?.description?.includes(filterText) || row?.resolution?.includes(filterText)) &&
      (statusFilter ? row?.status === statusFilter : true) &&
      (criticalityFilter ? row?.criticality === criticalityFilter : true)
    );
  });

  const columns = [
    { field: 'complaintType', headerName: 'Category', width: 150 },
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
    { field: 'createdByName', headerName: 'Created By', width: 150 },
    { field: 'assignedToName', headerName: 'Assigned To', width: 120 },
    { field: 'criticality', headerName: 'Criticality', width: 130 },
    { field: 'resolution', headerName: 'Resolution', width: 150 }, // Decreased width
    { field: 'status', headerName: 'Status', width: 100 }, // Decreased width
    { field: 'createdOnDate', headerName: 'Created On', width: 120 },
    { field: 'updatedByName', headerName: 'Updated By', width: 150 },
    { field: 'updatedOnDate', headerName: 'Updated On', width: 120 },
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
              <MenuItem value="New">Open</MenuItem>
              <MenuItem value="Inprogress">Pending</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
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
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="High">High</MenuItem>
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
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: "none !important",
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#e0e0e0',
                borderRadius: '8px 8px 0 0',
              },
              '& .MuiDataGrid-footerCell': {
                border: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer', // Hand cursor on row hover
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f1f1f1',
              },
              '& .MuiDataGrid-row:nth-of-type(odd):hover': {
                backgroundColor: '#e0f7fa',
              },
              '& .MuiDataGrid-row:nth-of-type(even):hover': {
                backgroundColor: '#e0f7fa'
              },
              minHeight: '300px',
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
