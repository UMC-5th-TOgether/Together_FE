const initialState = {
    email: "",
    pw: "",
    isLoggedIn: false,
    authToken: null
};

export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: isLoggedIn,
});

export const setAuthToken = (token) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: token,
});

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_EMAIL":
            return {
                ...state,
                email: action.payload,
            };
        case "SET_USER_PASSWORD":
            return {
                ...state,
                pw: action.payload,
            };
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;
