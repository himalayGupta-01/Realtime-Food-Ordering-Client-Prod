import axios from "../helpers/axios"
import { userConstant } from "./Constants"

export const signup=(user)=>{
    return async (dispatch)=>{

        dispatch({type:userConstant.USER_REGISTER_REQUEST});
        const res = await axios.post('/signup',{
           ...user
        });
        // console.log(res)

        if(res.status===201){
            const {message}=res.data;
            dispatch({
                type: userConstant.USER_REGISTER_SUCCESS,
                payload:{
                    message
                }
            });
        }else {
            if(res.status >= 400 && res.status<=500){
                dispatch({
                    type:userConstant.USER_REGISTER_FAILURE,
                    payload:{error:res.data.error}
                })
            }
        }
    }
}
