import { Seq } from 'immutable';

export function filterTypeSelected(state) {
    return state.get('filter');
}

export function getNotifications(state) {
    return state.get("notifications");
}

export function getUnreadNotifications(state) {
    const notifications = state.notifications.get('messages');
    let unreadNotifications = [];

    if (notifications) {
        const notificationsSeq = Seq(notifications);
        unreadNotifications = notificationsSeq
            .filter(notification => !notification.isRead)
            .toArray();
        return unreadNotifications;
    }
    return unreadNotifications;
}
