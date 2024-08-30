import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "./uiActionTypes";
import {login, logout, hideNotificationDrawer, displayNotificationDrawer, loginRequest} from "./uiActionCreators";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';

jest.mock('fetch-mock');

const middleWares = [thunk];
const mockStore = configureStore(middleWares);

describe("uiActionCreators", () => {
    it("should return proper action for LOGIN", () => {
        const email = "me@me.com";
        const password = "123456";
        const expectedAction = { type: LOGIN, user: { email: email, password: password }};
        expect(login(email, password)).toEqual(expectedAction);
    });

    it("should return proper action for LOGOUT", () => {
        const expectedAction = { type: LOGOUT };
        expect(logout()).toEqual(expectedAction);
    });

    it("should return proper action for DISPLAY_NOTIFICATION_DRAWER", () => {
        const expectedAction = { type: DISPLAY_NOTIFICATION_DRAWER };
        expect(displayNotificationDrawer()).toEqual(expectedAction);
    });

    it("should return proper action for HIDE_NOTIFICATION_DRAWER", () => {
        const expectedAction = { type: HIDE_NOTIFICATION_DRAWER };
        expect(hideNotificationDrawer()).toEqual(expectedAction);
    });
});
