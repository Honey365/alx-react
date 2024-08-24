import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER
} from '../actions/notificationActionTypes';

const initialState = [];
export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.data.map(function (notification) {
                    return {...notification, isRead: false};
                }),
            };
        case MARK_AS_READ:
            return {
                ...state,
                notifications: state.notifications.map(function (notification) {
                    if (action.index === notification.id) {
                        return {...notification, isRead: true};
                    }
                    return {...notification};
                }),
            };
        case SET_TYPE_FILTER:
            return {
                ...state,
                filter: action.filter,
            };
        default:
            return state;
    }
}
