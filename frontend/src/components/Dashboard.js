
import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Toolbar, Container } from '@mui/material';
import Header from './Header';
import ComplaintForm from './ComplaintForm';
import ChartView from './ChartView';
import GridView from './GridView';
import DetailView from './DetailView';
import CommonApiCallService from './CommonApiCall.Service';
export const CommonContext = createContext();

const Dashboard = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const [isShowSelectedView, setIsShowSelectedView] = useState("chart");
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [user, setUser] = useState(userDetails);

  useEffect(() => {
    CommonApiCallService.getUsers(fetchUsersApiCallbackHandler);
    let data = { role: userDetails?.userInfo?.role, id: userDetails?.userInfo?.id };
    CommonApiCallService.getComplaints(data, fetchComplaintsApiCallbackHandler);
  }, []);

  const fetchUsersApiCallbackHandler = (userList) => {
    setAllUsers(userList);
  };
  
  const fetchComplaintsApiCallbackHandler = (complaintList) => {
    setAllComplaints(complaintList);
  };
  
  const viewClickHandler = (selectedView, chartType, selectedRow) => {
    setIsShowSelectedView(selectedView);
    !!chartType && setSelectedChart(chartType);
    !!selectedRow?.id && setSelectedDetail(selectedRow);
    if (selectedView === "chart") {
      setSelectedChart(null);
      setSelectedDetail(null);
    }
  };

  const handleRaiseComplaint = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  const updateAllComplaints = (data, isNew) => {
    let updatedList = [...allComplaints];
    if (isNew) {
      updatedList.push(data);
    } else {
      let complaintIndex = updatedList.findIndex((complaint) => complaint.id === data.id);
      updatedList[complaintIndex] = { ...data };
    }

    setAllComplaints(updatedList);
  };

  let contextValues = {
    viewClickHandler,
    handleRaiseComplaint,
    user: userDetails?.userInfo,
    allUsers,
    updateAllComplaints
  };
  
  return (
    <CommonContext.Provider value={contextValues}>
      <Box sx={{ display: 'flex', marginTop: '-40px' }}>
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Header */}
          <Header />
          {/* Add Toolbar for space under the fixed AppBar */}
          <Toolbar />
          {/* Content Area */}
          <Container maxWidth="lg" style={{minWidth: '100%'}}>
            {isShowSelectedView === "chart" && <ChartView
              viewClickHandler={viewClickHandler}
              allComplaints={allComplaints}
            />}
            {isShowSelectedView === "grid" && <GridView
              viewClickHandler={viewClickHandler}
              allComplaints={allComplaints}
            />}
            {isShowSelectedView === "detail" &&
              <DetailView
              viewClickHandler={viewClickHandler}
              chartType={selectedChart}
              selectedDetail={selectedDetail}
            />}
          </Container>
        </Box>
        <ComplaintForm
          open={open}
          onClose={handleClose}
          allUsers={allUsers}
          user={userDetails?.userInfo}
        />
      </Box>
    </CommonContext.Provider>
  );
};

export default Dashboard;