import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ, NotificationTypeFilters,
    SET_TYPE_FILTER
} from '../actions/notificationActionTypes';
import {Map, setIn} from 'immutable';
import {notificationsNormalizer} from "../schema/notifications";


const initialState = [];
export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            const data = action.data.map(notification => ({ ...notification, isRead: false }));
            return state.merge({
                filter: NotificationTypeFilters.DEFAULT,
                notifications: notificationsNormalizer(data),
            });

        case MARK_AS_READ:
            return setIn(state, ['notifications', action.index.toString(), 'isRead'], true);
        case SET_TYPE_FILTER:
            return Map(state).set('filter', action.filter);
        default:
            return state;
    }
}
