export const setUserEmail = (email) => ({
    type: "SET_USER_EMAIL",
    payload: email,
});

export const setUserPassword = (pw) => ({
    type: "SET_USER_PASSWORD",
    payload: pw,
});

export const loginUser = () => ({
    type: "LOGIN_USER",
});

export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: isLoggedIn,
});