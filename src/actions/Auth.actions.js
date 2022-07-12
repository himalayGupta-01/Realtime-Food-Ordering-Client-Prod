import axios from "../helpers/axios"
import { authConstant } from "./Constants"

export const login = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstant.LOGIN_REQUEST });
        const res = await axios.post('/signin', {
            ...user
        });
        // console.log(res)

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token: token, user: user
                }
            });
        } else {
            if (res.status >= 400 && res.status <= 500) {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}

export const signup = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstant.LOGIN_REQUEST });
        const res = await axios.post('/signup', {
            ...user
        });
        // console.log(res)

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    message
                }
            });
        } else {

            if (res.status >= 400 && res.status <= 500) {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}



export const isUserLoggedIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token: token, user: user
                }
            });
        } else {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: { error:'Server**Failed to Login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({
            type: authConstant.LOGOUT_REQUEST
        })
        const res = await axios.post('/signout');
        // console.log(res)

        if (res.status === 200) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({
                type: authConstant.LOGOUT_SUCCESS
            })
        }
        else {
            dispatch({
                type: authConstant.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}