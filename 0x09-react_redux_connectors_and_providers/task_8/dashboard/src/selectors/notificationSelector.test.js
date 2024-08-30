import {Map, List, fromJS} from 'immutable';
import {
    filterTypeSelected,
    getUnreadNotificationsByType,
} from './notificationSelector';
import notificationReducer from "../reducers/notificationReducer";
import {markAsRead} from "../actions/notificationActionCreators";



const initialState = Map({
    filter: "DEFAULT",
    messages: [
        {id: 1, type: "default", value: "New course available", isRead: false},
        {id: 2, type: "urgent", value: "New resume available", isRead: false},
        {id: 3, type: "urgent", value: "New data available", isRead: false}
    ]
});

describe('selectors test suite', () => {
    it('works as expected', function() {
        const result = filterTypeSelected({notifications: initialState});
        expect(result).toBe('DEFAULT');
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

describe('getUnreadNotificationsByType', function() {
    it('returns unread urgent notifications when the filter is URGENT', function() {
        const initialState = Map({
            filter: "URGENT",
            messages: [
                {id: 1, type: "default", value: "New course available", isRead: false},
                {id: 2, type: "urgent", value: "New resume available", isRead: false},
                {id: 3, type: "urgent", value: "New data available", isRead: false}
            ]
        });

        const expectedNotifications = [
            {id: 2, type: "urgent", value: "New resume available", isRead: false},
            {id: 3, type: "urgent", value: "New data available", isRead: false}
        ];

        const notifications = getUnreadNotificationsByType({notifications: initialState});
        expect(notifications).toStrictEqual(expectedNotifications);
    });

    describe('getUnreadNotificationsByType', () => {
        it('returns all unread notifications when the filter is DEFAULT', () => {
            const expectedNotifications = initialState.get('messages');
            const notifications = getUnreadNotificationsByType({notifications: initialState});
            expect(notifications).toStrictEqual(expectedNotifications);
        });
    });
});

