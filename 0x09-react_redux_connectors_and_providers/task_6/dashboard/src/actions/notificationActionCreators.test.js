import {
    MARK_AS_READ,
    SET_TYPE_FILTER,
    NotificationTypeFilters,
    SET_LOADING_STATE,
    FETCH_NOTIFICATIONS_SUCCESS
} from "./notificationActionTypes";

import {
    fetchNotifications,
    markAsRead,
    setLoadingState,
    setNotificationFilter,
    setNotifications
} from "./notificationActionCreators";
import fetchMock from 'jest-fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
fetchMock.enableMocks();

describe("notificationActionCreators tests", () => {
    it("should return the right action for MARK_AS_READ", () => {
        const expectedAction = { type: MARK_AS_READ, index: 1 };
        expect(markAsRead(1)).toEqual(expectedAction);
    });

    it("should return right action for NotificationTypeFilters", () => {
        const expectedAction = { type: SET_TYPE_FILTER, filter: "DEFAULT"};
        expect(setNotificationFilter(NotificationTypeFilters["DEFAULT"])).toEqual(expectedAction);
    });

    it('should update reducer correctly for SET_LOADING_STATE', () => {
        const loading = true;
        const expectedAction = {
            type: 'SET_LOADING_STATE',
            loading,
        };

        const action = setLoadingState(loading);
        expect(action).toEqual(expectedAction);
    });

    it('should update reducer correctly for FETCH_NOTIFICATIONS_SUCCESS', () => {
        const data = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", value: "Urgent update is available" },
        ];
        const expectedAction = {
            type: 'FETCH_NOTIFICATIONS_SUCCESS',
            data,
        };
        const action = setNotifications(data);
        expect(action).toEqual(expectedAction);
    });

});


describe('fetchNotifications', () => {
    let store;
    beforeEach(() => {
        fetchMock.resetMocks();
        store = mockStore({});
    });
    it('dispatches the correct actions on successful fetchNotifications', () => {
        const notifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", value: "Urgent update is available" },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(notifications));
        const expectedActions = [
            setLoadingState(true),
            setNotifications(notifications),
            setLoadingState(false),
        ];

        const store = mockStore();
        return store.dispatch(fetchNotifications()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on fetchNotifications failure', () => {
        fetchMock.mockRejectOnce(new Error('Fetch failed'));

        const expectedActions = [
            setLoadingState(true),
            setLoadingState(false),
        ];
        const store = mockStore();
        return store.dispatch(fetchNotifications()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});