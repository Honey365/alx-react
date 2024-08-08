import React from 'react';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from "./NotificationItemShape";

import {css, StyleSheet} from 'aphrodite';

const colorPrimary = '#E11D3F';
const styles = StyleSheet.create({
    Notification: {
        padding: "1em",
        border: "2px dashed red",
        position: "absolute",
        top: "2.3em",
        right: "0",
        "@media (max-width: 900px)": {
            position: "absolute",
            display: "block",
            top: "0",
            height: "100vh",
            zIndex:"9999",
            background: "white",
            width: "100%",
            border: "none",
            fontSize: "20px",
            padding: "0",
        },
    },

    "notification-header": {
        display: "flex",
        justifyContent: "space-between",
    },

    MenuItem: {
        textAlign: 'right',
        paddingRight: '2rem',
        "@media (max-width: 900px)": {
            display: "none",
        },
    },
    ulStyling: {
        "@media (max-width: 900px)": {
            padding: "0",
        },
    },
    closeButton: {
        background: 'none',
        border: 'none',
        position: 'relative',
        right: '-92%',
        top: '-10%',
        cursor: 'pointer',
        "@media (max-width: 900px)": {
            top: "0",
            background: "gray"
        },
    },
});


class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.markAsRead = this.markAsRead.bind(this);
    }

    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.length > this.props.listNotifications.length;
    }

    render() {

        return (
            <React.Fragment>
                <div className={css(styles.MenuItem)}>
                    <p>Your notifications</p>
                </div>
                {this.props.displayDrawer && (
                    <div className={css(styles.Notification)}>
                        <button
                            type="button"
                            aria-label="Close"
                            className={css(styles.closeButton)}
                            onClick={() => console.log('Close button has been clicked')}
                        >
                            <img src={close_icon} alt="Close icon" style={{ width: '24px', height: '24px' }} />
                        </button>
                        <p>Here is the list of notifications</p>
                        <ul className={css(styles.ulStyling)}>
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
