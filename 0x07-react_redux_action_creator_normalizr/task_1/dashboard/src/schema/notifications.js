import notifications from '../../notifications.json';
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: "guid" });
const notification = new schema.Entity('notifications', {
    author: user,
    context: message
    }
);

export default function getAllNotificationsByUser(userId) {
    const filteredNotifications = notifications.filter((notification) => {
        return notification.author.id === userId;
    });

    return filteredNotifications.map((notification) => {
        return notification.context;
    });
}

const normalizedNotifications = normalize(notifications, [notification]);

export { normalizedNotifications };