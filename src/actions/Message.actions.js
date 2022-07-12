import axios from "../helpers/axios"
import { messageConstant } from "./Constants"

export const sendMessage = (message) => {
    return async (dispatch) => {

        dispatch({ type: messageConstant.ADD_MESSAGE_REQUEST });
        const res = await axios.post('/message/create', {
            ...message
        });
        // console.log(res)

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: messageConstant.ADD_MESSAGE_SUCCESS,
                payload: {
                    message
                }
            });
        } else {
            if (res.status >= 400 && res.status <= 500) {
                dispatch({
                    type: messageConstant.ADD_MESSAGE_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}
