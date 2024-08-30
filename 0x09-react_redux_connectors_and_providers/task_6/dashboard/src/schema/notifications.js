import notifications from '../../dist/notifications.json';
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: "guid" });
const notification = new schema.Entity('notifications', {
    author: user,
    context: message
    }
);

const normalizedNotifications = normalize(notifications, [notification]);

export default function getAllNotificationsByUser(userId) {
    const userNotifications = [];
    const notifications = normalizedNotifications.entities.notifications;
    const messages = normalizedNotifications.entities.messages;

    for (const id in notifications) {
        const notification = notifications[id];
        if (notification.author === userId) {
            userNotifications.push(messages[notification.context]);
        }
    }
    return userNotifications;
}

export function notificationsNormalizer(data) {
    return normalize(data, [notification]);
}

export { normalizedNotifications };