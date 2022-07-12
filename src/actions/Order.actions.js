import axios from "../helpers/axios";
import { orderConstant } from "./Constants";


export const takeOrder = (item) => {
    return async dispatch => {

        dispatch({ type: orderConstant.ORDER_PLACED_REQUEST });

        const res = await axios.post('/add-order', { ...item });
        // console.log(item);
        if(res.status===201){

            const {order }=res.data

            dispatch({
                type:orderConstant.ORDER_PLACED_SUCCESS,
                payload:{order:order}
            })
        }else{
            dispatch({
                type:orderConstant.ORDER_PLACED_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}

export const getOrderById = (id) => {
    return async dispatch => {

        dispatch({ type: orderConstant.ORDERS_BY_ID_FETCHED_REQUEST });

        const res = await axios.get(`/orders-by-id/${id}`)
        // console.log(res)
        if (res.status === 200) {
            const { orders } = res.data

            dispatch({
                type: orderConstant.ORDERS_BY_ID_FETCHED_SUCCESS,
                payload: { orders: orders }
            })
        } else {
            dispatch({
                type: orderConstant.ORDERS_BY_ID_FETCHED_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

