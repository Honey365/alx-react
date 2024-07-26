import React from "react";
import "./Notifications.css";

function NotificationItem({ type, html, value }) {

    if (type && value) {
        return (
            <li data-notification-type={type}>{value}</li>
        );
    }

    if (html) {
        return(
            <li data-notification-type={type} dangerouslySetInnerHTML={html}></li>
        );
    }
}

export default NotificationItem;
