import { orderConstant } from "../actions/Constants";



// done by me to display added product immediately
const initialState = {
    orders: [],
    loading: false,
    error: null,
    message:""
}

// const showOrders = (orders, order) => {
//     let newOrders = [];
//     newOrders.push({
//         ...order
//     });
//     for (let ord of orders) {
//         newOrders.push({
//             ...ord
//         })
//     }
    
//     return newOrders;
// }

const orderReducer=(state = initialState, action) => {
    switch (action.type) {

        case orderConstant.ORDER_PLACED_REQUEST:
            state = {
                ...state,
                loading: true,
                error:null,
                message:""
            }
            break;
        case orderConstant.ORDER_PLACED_SUCCESS:
            state = {
                ...state,
                // orders:showOrders(state.orders, action.payload.order),
                loading: false,
                error:null,
                message:"Order Placed SuccessFully"
            }
            break;
        case orderConstant.ORDER_PLACED_FAILURE:
            state = {
                ...initialState,
                error:action.payload.error
            }
            break;

        case orderConstant.ORDERS_BY_ID_FETCHED_REQUEST:
            state = {
                ...state,
                loading: true,
                message:""
            }
            break;
            
        case orderConstant.ORDERS_BY_ID_FETCHED_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                loading: false,

            }
            break;
        case orderConstant.ORDERS_BY_ID_FETCHED_FAILURE:
            state = {
                ...initialState,
                error:action.payload.error
            }
            break;
            default: break;
    }
    return state;
}

export default orderReducer;