import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "./uiActionTypes";
import {login, logout, hideNotificationDrawer, displayNotificationDrawer, loginRequest} from "./uiActionCreators";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
fetchMock.enableMocks();

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

describe('loginRequest', () => {
    let store;
    beforeEach(() => {
        fetchMock.resetMocks();
        store = mockStore({});
    });

    it('should receive LOGIN and LOGIN_SUCCESS on successful API response', async () => {
        const expectedActions = [
            {
                type: 'LOGIN', user: { email: 'me@me.com', password: '123456' }
            },
            {
                type: 'LOGIN_SUCCESS'
            }
        ];

        fetchMock.mockOnce('http://localhost:8564/login-success.json', {
            status: 200,
            body: 'Login Success'
        });

        await store.dispatch(loginRequest('me@me.com', '123456'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should receive LOGIN and LOGIN_FAILURE actions when API query fails', async () => {
        const expectedActions = [
            {
                type: LOGIN, user: { email: 'me@me.com', password: 'abcdefg' }
            },
            {
                type: LOGIN_FAILURE
            }
        ];

        fetchMock.mockOnce('http://localhost:8564/login-success.json', {
            status: 401,
            body: 'Invalid credentials'
        });

        await store.dispatch(loginRequest('me@me.com', 'abcdefg'));
        expect(store.getActions()).toEqual(expectedActions);
    });

});