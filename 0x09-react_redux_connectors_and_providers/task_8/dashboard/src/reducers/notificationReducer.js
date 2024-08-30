import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ, NotificationTypeFilters, SET_LOADING_STATE,
    SET_TYPE_FILTER
} from '../actions/notificationActionTypes';
import {Map, setIn, Seq} from 'immutable';
import {notificationsNormalizer} from "../schema/notifications";


export const initialState = {
    notifications: [],
    filter: 'DEFAULT',
    loading: false,
};

export default function notificationReducer(state = Map(initialState), action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            const notificationsList = action.data.map(notification => ({ ...notification, isRead: false }));
            const messages = notificationsNormalizer(notificationsList).entities.messages || {};
            return state.mergeDeep({ messages: Object.values(messages) });
        case MARK_AS_READ:
            const index = state.get('messages').findIndex(notification => notification.guid === action.index);
            return setIn(state, ['messages', index, 'isRead'], true);
        case SET_TYPE_FILTER:
                 return state.set('filter', action.filter);
        case SET_LOADING_STATE:
            return state.set('loading', action.loading);
        default:
            return state;
    }
}
