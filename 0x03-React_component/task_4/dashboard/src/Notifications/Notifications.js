import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from "./NotificationItemShape";

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }

    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {

        return (
            <React.Fragment>
                <div className="menuItem">
                    <p>Your notifications</p>
                </div>
                {this.props.displayDrawer && (
                    <div className="Notifications">
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={() => console.log('Close button has been clicked')}
                            style={{
                                background: 'none',
                                border: 'none',
                                position: 'relative',
                                right: '-94%',
                                top: '-10%',
                                cursor: 'pointer',
                            }}
                        >
                            <img src={close_icon} alt="Close icon" style={{ width: '24px', height: '24px' }} />
                        </button>
                        <p>Here is the list of notifications</p>
                        <ul>
                            {this.props.listNotifications && this.props.listNotifications.length > 0 ? (
                                this.props.listNotifications.map((notification, index) => (
                                    <NotificationItem
                                        key={index}
                                        type={notification.type}
                                        value={notification.value}
                                        html={notification.html}
                                        markAsRead={this.markAsRead}
                                        id={notification.id}
                                    />
                                ))
                            ) : (
                                <li>No new notification for now</li>
                            )}
                        </ul>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
};

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

export default Notifications;
