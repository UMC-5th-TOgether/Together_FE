const initialState = {
    email: "",
    pw: "",
};

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
        default:
            return state;
    }
};

export default loginReducer;
