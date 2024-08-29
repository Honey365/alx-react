import {fromJS} from 'immutable';

export function filterTypeSelected(state) {
    return state.get('filter');
}

export function getNotifications(state) {
    return state.get("notifications");
}

export function getUnreadNotifications(state) {
    const notifications = state.get('notifications');
    const unreadNotifications = notifications.filter(function (notification) {
        return !notification.get('isRead');
    });
    return fromJS(unreadNotifications);
}
