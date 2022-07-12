import { messageConstant } from "../actions/Constants"

const initState = {
    error: "",
    message: "",
    loading: false
}

const MessageReducer = (state = initState, action) => {
    switch (action.type) {
        case messageConstant.ADD_MESSAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case messageConstant.ADD_MESSAGE_SUCCESS:
            state = {
                ...state,
                error: null,
                loading: false,
                message: action.payload.message
            }
            break;
        case messageConstant.ADD_MESSAGE_FAILURE:
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

export default MessageReducer