import { Seq } from 'immutable';
import { createSelector } from 'reselect';

export function filterTypeSelected(state) {
    return state.notifications.get('filter');
}

export function getNotifications(state) {
    return state.notifications.get("messages");
}

export const getUnreadNotificationsByType = createSelector(
    [filterTypeSelected, getNotifications],
    function (filter, notifications) {
        if (Array.isArray(notifications)) {
            if (filter === 'DEFAULT') {
                return notifications.filter(function (notification) {
                    return !notification.isRead;
                });
            } else if (filter === 'URGENT') {
                return notifications.filter(function (notification) {
                    return !notification.isRead && notification.type === 'urgent';
                });
            }
        }
        return [];
    }
);
