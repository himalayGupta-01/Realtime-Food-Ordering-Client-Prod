import axios from 'axios';
import { api } from '../urlConfig';
import store from "../store/Store";
import { authConstant } from '../actions/Constants';

const token =window.localStorage.getItem('token')

const axiosIsntance =axios.create({
    baseURL:api,
    headers:{
        'Authorization':token ? `Bearer ${token}`:''
    }
})

axiosIsntance.interceptors.request.use((req) => {
    const {auth}=store.getState();
    if(auth.token){
        req.headers.Authorization=`Bearer ${auth.token}`;
    }
    return req;
})




axiosIsntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    // console.log(error.response);
    const { status } = error.response;
    if (status === 500) {        //for jwt expired
        localStorage.clear();
        store.dispatch({type:authConstant.LOGOUT_SUCCESS});
    }
    else{
        return error.response;
    }
    return Promise.reject(error);
})

export default axiosIsntance;