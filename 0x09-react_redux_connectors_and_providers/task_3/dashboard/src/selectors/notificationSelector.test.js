import {Map, List, fromJS} from 'immutable';
import {
    filterTypeSelected,
    getNotifications,
    getUnreadNotifications,
} from './notificationSelector';
import {MARK_AS_READ} from "../actions/notificationActionTypes";
import notificationReducer from "../reducers/notificationReducer";
import {StyleSheetTestUtils} from "aphrodite";

const initialState = new Map(fromJS({
    filter: 'DEFAULT',
    notifications: [
        {id: 1, type: "default", value: "New course available", isRead: false},
        {id: 2, type: "urgent", value: "New resume available", isRead: false},
        {id: 3, type: "urgent", value: "New data available", isRead: false}
    ],
}));

describe('selectors test suite', () => {


    it('works as expected', function() {
        const action = {
            type: MARK_AS_READ,
            index: 1
        };
        const newState = notificationReducer(initialState, action);
        expect(filterTypeSelected(newState)).toBe('DEFAULT');
    });
});

describe('getNotifications test suite', function() {
    it("returns a correct list of the message entities within the reducer", function() {
        const action = {
            type: MARK_AS_READ,
            index: 1
        };

        const newState = notificationReducer(initialState, action);
        const notifications = getNotifications(newState);

        const expectedState = new Map(fromJS({
            filter: 'DEFAULT',
            notifications: [
                {id: 1, type: "default", value: "New course available", isRead: false},
                {id: 2, type: "urgent", value: "New resume available", isRead: true},
                {id: 3, type: "urgent", value: "New data available", isRead: false}
            ],
        }));

        expect(notifications).toStrictEqual(expectedState.get('notifications'));
    });
});

describe('getUnreadNotifications test suite', function() {
    it("returns a correct list of the message entities within the reducer", function() {
        const action = {
            type: MARK_AS_READ,
            index: 1
        };

        const newState = notificationReducer(initialState, action);
        const notifications = getUnreadNotifications(newState);

        const expectedState = new Map(fromJS({
            filter: 'DEFAULT',
            notifications: [
                {id: 1, type: "default", value: "New course available", isRead: false},
                {id: 3, type: "urgent", value: "New data available", isRead: false}
            ],
        }));

        expect(notifications).toStrictEqual(expectedState.get('notifications'));
    });
});
