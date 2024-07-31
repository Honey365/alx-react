import React, { Component } from 'react';
import './Notifications.css';
import PropTypes from "prop-types";

class NotificationItem extends Component {
    render() {
        const { type, html, value, markAsRead, id } = this.props;

        if (type && value) {
            return (
                <li onClick={() => markAsRead(id)} data-notification-type={type}>{value}</li>
            );
        }

        if (html) {
            return (
                <li  onClick={() => markAsRead(id)} data-notification-type={type} dangerouslySetInnerHTML={html}></li>
            );
        }
    }
}

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
