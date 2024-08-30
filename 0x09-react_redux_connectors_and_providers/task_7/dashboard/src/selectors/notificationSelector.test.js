import {Map, List, fromJS} from 'immutable';
import {
    filterTypeSelected,
    getNotifications,
    getUnreadNotifications,
} from './notificationSelector';
import {MARK_AS_READ} from "../actions/notificationActionTypes";
import notificationReducer from "../reducers/notificationReducer";
import {notificationsNormalizer} from "../schema/notifications";
import {markAsRead} from "../actions/notificationActionCreators";

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
        const action = {};
        const newState = notificationReducer(undefined, action);
        expect(filterTypeSelected(newState)).toBe('DEFAULT');
    });
});

describe('getNotifications test suite', function() {
    it("returns a correct list of the message entities within the reducer", function() {
            const initialState = {
                messages: [
                    { guid: '1', isRead: false, id: 1, type: 'default', value: 'New course available' },
                    { guid: '2', isRead: false, id: 1, type: 'default', value: 'New course available' },
                ],
            };
            const action = markAsRead('1');
            const newState = notificationReducer(Map(initialState), action);
            expect(newState.toJS()).toEqual({
                messages: [
                    { guid: '1', isRead: true, id: 1, type: 'default', value: 'New course available' },
                    { guid: '2', isRead: false, id: 1, type: 'default', value: 'New course available' },
                ],
            });
    });
});

describe('getUnreadNotifications test suite', function() {
    it("returns a correct list of the message entities within the reducer", function() {
        const state = {
            notifications: Map({
                messages: List([
                    { id: 1, type: 'default', value: 'New course available', isRead: false },
                    { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
                    { id: 3, type: 'urgent', value: 'New data available', isRead: true },
                ]),
            }),
        };
        const result = getUnreadNotifications(state);

        console.log(result);
        expect(result).toEqual([
            { id: 1, type: 'default', value: 'New course available', isRead: false },
            { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        ]);
    });
});
