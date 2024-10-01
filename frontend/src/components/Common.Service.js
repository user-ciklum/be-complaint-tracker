const CommonService = {
    getChartDetailsByCategories(allComplaints) {
        let charts = [];
        let subChart = [];
       
        let allCharts = [
            { key: "status", value: ["New", "Inprogress", "Closed"], label: "By Status", displayKey: ["Status", "Number"], displayValueKey: ["New", "In-progress", "Closed"] },
            { key: "complaintType", value: ["student", "teacher", "management", "transport"], label: "By Categories", displayKey: ['Category', 'Number of Complaints'], displayValueKey: ["Student", "Teacher", "Management", "Transport"] },
            { key: "criticality", value: ["Low", "Moderate", "High"], label: "By Urgency Levels", displayKey: ["Urgency Levels", "Number"], displayValueKey: ["Low", "Moderate", "High"] },
            { key: "assignedType", value: ["student", "teacher", "management"], label: "By Assignee", displayKey: ["Assignee", "Number"], displayValueKey: ["Student", "Teacher", "Management"] },
        ];

        let keyTypeCount = 0;
        allCharts.forEach(({ key, value, displayKey, displayValueKey, label }, index) => {
            subChart.push(displayKey);
            value.forEach((type, ind) => {
                keyTypeCount = allComplaints.filter(complaint => complaint[key] == type).length;
                subChart.push([displayValueKey[ind], keyTypeCount]);
            });
            charts.push({ [key]: { label, data: subChart } });
            subChart = [];
        });
    
        return charts;
    },

    getDataByChart(chartDataList, key) {
        let keyData = chartDataList.filter(complaint => {
            return complaint[key];            
        });

        return keyData[0][key];
    },

    getDataByKey(chartDataList, type, property) {
        let propertyData = CommonService.getDataByChart(chartDataList, type);

        return propertyData[property];
    },

    getUserNameById(allUsers, userId) {
        let userData = allUsers.filter(user => {
            return user.id == userId;            
        });
        
        return userData[0]?.name || "";
    },

    getUpdatedComplaintList(allUsers, allComplaints) {
        let updatedList = [];

        allComplaints.forEach((complaint) => {
            updatedList.push({
                ...complaint,
                createdByName: CommonService.getUserNameById(allUsers, complaint.createdBy),
                assignedToName: CommonService.getUserNameById(allUsers, complaint.assignedTo),
            });
        });

        return updatedList;
    },

    getUserListByRole(allUsers, role) {
        let usersListByRole = [];

        allUsers.forEach((user) => {
            if (role.toLowerCase() === "student" && user.role === role.toLowerCase()) usersListByRole.push({ label: `${user.name} (${user.class[0]})`, value: user.id });
            if (role.toLowerCase() === "teacher" && user.role === role.toLowerCase()) usersListByRole.push({ label: user.name, value: user.id});
        if (['transport', 'management'].includes(role.toLowerCase()) && !['teacher', 'student'].includes(user.role))
            usersListByRole.push({ label: user.name, value: user.id});
        });

        return usersListByRole || [];
    },
};


export default CommonService;
