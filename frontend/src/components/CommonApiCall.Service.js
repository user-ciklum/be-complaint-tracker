import Api from "../Api";

const CommonApiCallService = {
    userLogin(payload, userLoginCallbackHandler, userLoginErrorCallbackHandler) {
        let url = `api/Users/login`;
    
        Api.post(url, payload)
        .then((response) => {
            userLoginCallbackHandler(response?.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
            userLoginErrorCallbackHandler && userLoginErrorCallbackHandler();
        });
    },
    
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
    
    getComplaints(data, fetchComplaintsApiCallbackHandler) {
        let url = data.role === "admin" ? `api/complaint` : `api/complaint/user/${data.id}`;
        
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
        let url = `api/complaint/${payload?.id}`;
    
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
