import React, { Component } from 'react';
import './Notifications.css';
import PropTypes from "prop-types";
import {StyleSheet} from "aphrodite";


const styles = StyleSheet.create({
    defaultNotification: {
        color: '#1D0563',
    },
    urgentNotification: {
        color: '#F02201',
    },
});

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
