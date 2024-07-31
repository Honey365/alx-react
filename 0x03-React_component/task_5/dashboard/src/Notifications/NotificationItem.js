import React, { Component } from 'react';
import './Notifications.css';
import PropTypes from "prop-types";

const NotificationItem = React.memo(function NotificationItem({ type, html, value, id, markAsRead }) {
    const handleItemClick = () => markAsRead(id);

    return (
        <li data-notification-type={type} onClick={handleItemClick} dangerouslySetInnerHTML={html}>
            {value}
        </li>
    );
});

NotificationItem.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    __html: PropTypes.shape({html: PropTypes.string}),
    markAsRead: PropTypes.func,
    id: PropTypes.number,
};

NotificationItem.defaultProps = {
    type: "default",
};

export default NotificationItem;
