import notifications from '../../notifications.json';

export default function getAllNotificationsByUser(userId) {
    const filteredNotifications = notifications.filter((notification) => {
        return notification.author.id === userId;
    });

    return filteredNotifications.map((notification) => {
        return notification.context;
    });
}
