import { userConstant } from "../actions/Constants"

const initState = {
    error: "",
    message: "",
    loading: false
}

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstant.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstant.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                error: null,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstant.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
            
        default: break;
    }
    return state;
}

export default UserReducer