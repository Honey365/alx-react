import notificationReducer from './notificationReducer';
import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';

describe('notificationReducer Tests', () => {
    it('handles FETCH_NOTIFICATIONS_SUCCESS and updates isRead property', () => {
        const initialState = {
            notifications: [],
        };

        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
                {id: 1, type: "default", value: "New course available"},
                {id: 2, type: "urgent", value: "New resume available"},
                {id: 3, type: "urgent", value: "New data available"}
            ]
        };

        const newState = notificationReducer(initialState, action);
        expect(newState.notifications).toHaveLength(3);
        expect(newState.notifications[0].isRead).toBe(false);
    });

    it('handles MARK_AS_READ and updates the correct notification', () => {
        const initialState = {
            notifications: [
                {id: 1, type: "default", value: "New course available", isRead: false},
                {id: 2, type: "urgent", value: "New resume available", isRead: false},
                {id: 3, type: "urgent", value: "New data available", isRead: false}
            ],
        };

        const action = {
            type: MARK_AS_READ,
            index: 1,
        };

        const newState = notificationReducer(initialState, action);
        expect(newState.notifications).toHaveLength(3);
        expect(newState.notifications[0].isRead).toBe(true);
        expect(newState.notifications[1].isRead).toBe(false);
        expect(newState.notifications[2].isRead).toBe(false);
    });

    it('handles SET_TYPE_FILTER and updates the filter property', () => {
        const initialState = {
            notifications: [],
            filter: 'all',
        };

        const action = {
            type: SET_TYPE_FILTER,
            filter: 'unread',
        };

        const newState = notificationReducer(initialState, action);
        expect(newState.filter).toBe('unread');
    });

    it('handles unknown action and returns the current state', () => {
        const initialState = {
            notifications: [
                {id: 1, type: "default", value: "New course available", isRead: false},
                {id: 2, type: "urgent", value: "New resume available", isRead: false},
                {id: 3, type: "urgent", value: "New data available", isRead: false}
            ],
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = notificationReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});
