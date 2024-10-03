const CommonService = {
    getChartDetailsByCategories(allComplaints) {
        let charts = [];
        let subChart = [];
       
        let allCharts = [
            { key: "status", value: ["New", "Inprogress", "Closed"], label: "By Status", displayKey: ["Status", "Number"], displayValueKey: ["New", "In-progress", "Closed"] },
            {
                key: "complaintType",
                value: ["student", "teacher", "management", "transport"],
                label: "By Categories",
                displayKey: ['Category', 'Number of Complaints', { role: 'style' }],
                displayValueKey: ["Student", "Teacher", "Management", "Transport"],
                customColor: ["#3366cc", "#ff9900", "#dc3912", "#bf00ff"],
            },
            { key: "criticality", value: ["Low", "Moderate", "High"], label: "By Urgency Levels", displayKey: ["Urgency Levels", "Number"], displayValueKey: ["Low", "Moderate", "High"] },
            { key: "assignedType", value: ["student", "teacher", "management"], label: "By Assignee", displayKey: ["Assignee", "Number"], displayValueKey: ["Student", "Teacher", "Management"] },
        ];

        let keyTypeCount = 0;
        allCharts.forEach(({ key, value, displayKey, displayValueKey, label, customColor }) => {
            subChart.push(displayKey);
            value.forEach((type, ind) => {
                keyTypeCount = allComplaints.filter(complaint => complaint[key] == type).length;
                if (key === "complaintType")
                    subChart.push([displayValueKey[ind], keyTypeCount, `color: ${customColor[ind]}`]);
                else subChart.push([displayValueKey[ind], keyTypeCount]);
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
        // Sorting complaints by latest change on top
        allComplaints.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
        allComplaints.forEach((complaint) => {
            let createdAt = new Date(complaint?.createdAt || "");
            createdAt = createdAt ? createdAt?.toLocaleDateString("en-GB") : "";
            let updatedAt = new Date(complaint?.updatedAt || "");
            updatedAt = updatedAt ? updatedAt?.toLocaleDateString("en-GB") : "";

            updatedList.push({
                ...complaint,
                createdByName: CommonService.getUserNameById(allUsers, complaint.createdBy),
                assignedToName: CommonService.getUserNameById(allUsers, complaint.assignedTo),
                updatedByName: CommonService.getUserNameById(allUsers, complaint.updatedBy),
                createdOnDate: createdAt,
                updatedOnDate: updatedAt
            });
        });

        return updatedList;
    },

    getUserListByRole(allUsers, role) {
        let usersListByRole = [];

        allUsers.forEach((user) => {
            if (role.toLowerCase() === "student" && user.role === role.toLowerCase()) usersListByRole.push({ label: `${user.name} (${user.class[0]})`, value: user.id });
            if (role.toLowerCase() === "teacher" && user.role === role.toLowerCase()) usersListByRole.push({ label: user.name, value: user.id });
            if (role.toLowerCase() === "transport" && user.role === role.toLowerCase()) usersListByRole.push({ label: user.name, value: user.id });
            if (role.toLowerCase() === "management" && user.role === "admin") usersListByRole.push({ label: user.name, value: user.id});
        });

        return usersListByRole || [];
    },
};


export default CommonService;
