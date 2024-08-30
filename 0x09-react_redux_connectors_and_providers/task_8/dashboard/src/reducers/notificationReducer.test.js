import notificationReducer from './notificationReducer';
import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';
import {fromJS, Map, Seq} from "immutable";
import {markAsRead} from "../actions/notificationActionCreators";

describe('notificationReducer Tests', () => {

    it('handles FETCH_NOTIFICATIONS_SUCCESS and updates isRead property', () => {
        const initialState = Map({
            filter: 'DEFAULT',
            messages: [],
            loading: false
        });

        const fetchNotificationsSuccess = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
                {id: 1, type: "default", value: "New course available"},
                {id: 2, type: "urgent", value: "New resume available"},
                {id: 3, type: "urgent", value: "New data available"}
            ]
        };
        const newState = notificationReducer(initialState, fetchNotificationsSuccess);
        expect(newState.get('filter')).toBe('DEFAULT');
        expect(newState.get('loading')).toBe(false);
        const messagesSeq = Seq(newState.get('messages') || Iterable());
        messagesSeq.valueSeq().forEach((message) => {
            expect(message).toHaveProperty('id');
            expect(message).toHaveProperty('type');
            expect(message).toHaveProperty('value');
            expect(message).toHaveProperty('isRead');
            expect(message.get('isRead')).toBe(false);
        });
    });

    it('handles MARK_AS_READ and updates the correct notification', () => {
        const initialState = {
            messages: [
                { guid: '1', isRead: false, id: 1, type: 'default', value: 'New course available' },
                { guid: '2', isRead: false, id: 1, type: 'default', value: 'New course available' },
                { guid: '3', isRead: false, id: 1, type: 'default', value: 'New course available' },
            ],
        };
        const action = markAsRead('1');
        const newState = notificationReducer(Map(initialState), action);
        expect(newState.toJS()).toEqual({
            messages: [
                { guid: '1', isRead: true, id: 1, type: 'default', value: 'New course available' },
                { guid: '2', isRead: false, id: 1, type: 'default', value: 'New course available' },
                { guid: '3', isRead: false, id: 1, type: 'default', value: 'New course available' },
            ],
        });
    });

    it('handles SET_TYPE_FILTER and updates the filter property', () => {
        const initialState = Map({
            notifications: [],
            filter: 'DEFAULT',
        });

        const action = {
            type: SET_TYPE_FILTER,
            filter: 'unread',
        };

        const newState = notificationReducer(initialState, action);
        expect(newState.toJS().filter).toBe('unread');
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
