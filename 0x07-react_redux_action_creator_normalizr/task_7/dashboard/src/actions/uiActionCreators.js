import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "./uiActionTypes";

export function login(email, password) {
    return {
        type: LOGIN,
        user: { email, password },
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function displayNotificationDrawer() {
    return {
        type: DISPLAY_NOTIFICATION_DRAWER,
    };
}

export function hideNotificationDrawer() {
    return {
        type: HIDE_NOTIFICATION_DRAWER,
    };
}

export function boundLogin(email, password) {
    return function(dispatch) {
        dispatch(login(email, password));
    };
}

export function boundLogout() {
    return function(dispatch) {
        dispatch(logout());
    };
}

export function boundDisplayNotificationDrawer() {
    return function(dispatch) {
        dispatch(displayNotificationDrawer());
    };
}

export function boundHideNotificationDrawer() {
    return function(dispatch) {
        dispatch(hideNotificationDrawer());
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    };
}

export function loginRequest(email, password) {
    return function(dispatch) {
        dispatch(login(email, password));

        return fetch('http://localhost:8564/login-success.json')
            .then(function(response) {
                if (response.ok) {
                    dispatch(loginSuccess());
                } else {
                    dispatch(loginFailure());
                }
            })
            .catch(function(error) {
                dispatch(loginFailure());
            });
    };
}
