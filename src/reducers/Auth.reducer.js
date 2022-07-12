import { authConstant } from "../actions/Constants"

const initState = {
    token: null,
    user: {
        name: '',
        email: '',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: "",
    message: ''
};

const AuthReducer = (state = initState, action) => {

    // console.log(action);

    switch (action.type) {
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                error:"",
                authenticating: true
            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                error:"",
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstant.LOGIN_FAILURE:
            state = {
                ...initState,
                error:action.payload.error
            }
            break;
        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                error:"",
                loading: true
            }
            break;
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...initState,
            }
            break;
        case authConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
            default: break;
    }

    return state;
}

export default AuthReducer
