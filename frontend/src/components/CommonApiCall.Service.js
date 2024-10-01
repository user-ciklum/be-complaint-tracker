import Api from "../Api";

const CommonApiCallService = {
    getUsers(fetchUsersApiCallbackHandler) {
        let url = `api/Users`;
        Api.get(url)
        .then((response) => {
            fetchUsersApiCallbackHandler(response.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
    },
    
    getComplaints(fetchComplaintsApiCallbackHandler) {
        let url = `api/Complaints`;
        Api.get(url)
        .then((response) => {
            fetchComplaintsApiCallbackHandler(response.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
    },

    addComplaint(payload, addComplaintCallbackHandler, addComplaintErrorCallbackHandler) {
        let url = `api/complaint`;
    
        Api.post(url, payload)
        .then((response) => {
            addComplaintCallbackHandler(response?.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
            addComplaintErrorCallbackHandler && addComplaintErrorCallbackHandler();
        });
    },

    updateComplaints(payload, updateComplaintCallbackHandler, updateComplaintErrorCallbackHandler) {
        let url = `api/complaint/${payload?.Id}`;
    
        Api.put(url, payload)
        .then((response) => {
            updateComplaintCallbackHandler(response?.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
            updateComplaintErrorCallbackHandler && updateComplaintErrorCallbackHandler();
        });
    },
};

export default CommonApiCallService;
