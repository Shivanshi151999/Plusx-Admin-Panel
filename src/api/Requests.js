import axios from 'axios';
axios.defaults.baseURL                       = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type']  = 'application/json';
axios.defaults.headers.post['authorization'] = process.env.REACT_APP_Authorization;
// axios.defaults.withCredentials               = true

export const postRequest = async (URL, requestData, callback) => {
    try {
        const response  = await axios.post(URL, requestData);
        // return response.data;
        return callback(response.data);

    } catch (err) {
        return callback({code : 500, message : 'Connection faild, please start node server'});
    }
}

export const postRequestWithFile = async (URL, requestData, callback) => {
    try {
        const response = await axios({
            method  : "POST",
            url     : URL,
            data    : requestData,
            headers : {
                // "access_token" : sessionStorage.getItem('buyer_token') || localStorage.getItem('buyer_token'),
                "Content-Type" : "multipart/form-data"
            }
        });
        // return response.data;
        return callback(response.data);

    } catch (err) {
        return callback({code : 500, message : 'Connection faild, please start node server'});
        // throw err;
    }
}

export const getRequestWithToken = async (URL, requestData, callback) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    try {
        const response = await axios({
            method  : "POST",
            url     : URL,    
            data    : requestData,
            // withCredentials : true,
            headers : {
                "accesstoken"  : userDetails.access_token,
                "userId"       :  userDetails.user_id,
                "Content-Type" : "application/json"
            } 
        });
        
        if(response.status == 401){ 
            sessionStorage.clear();

        } else {  // if(response.status == 200)
            return callback(response.data);

        } 
    } catch (err) {
        return callback({code : 500, message : 'Connection failed, please start node server '});
    }
}

export const postRequestWithToken = async (URL, requestData, callback) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    try {
        const response = await axios({
            method  : "POST",
            url     : URL,    
            data    : requestData,
            withCredentials: true,
            headers : {
                "accesstoken": userDetails.access_token,
                "userId"     :  userDetails.user_id,
                "Content-Type" : "application/json"
            } 
        });
        
        if(response.status == 401){ 
            sessionStorage.clear();

        } else {  // if(response.status == 200)
            return callback(response.data);

        } 
    } catch (err) {
        return callback({code : 500, message : 'Connection failed, please start node server '});
    }
}

export const postRequestWithTokenAndFile = async (URL, requestData, callback) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    try {
        const response = await axios({
            method  : "POST",
            url     : URL,
            data    : requestData,
            withCredentials: true,
            headers : {
                "accesstoken": userDetails.access_token,
                "userId"     :  userDetails.user_id,
                "Content-Type" : "multipart/form-data"
            }
        });
        return callback(response.data);

    } catch (err) {
        return callback({code : 500, message : 'Connection faild, please start node server '});

    }
}

export const checkAuth = async () => {
}

