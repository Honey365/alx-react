import React from 'react';
import close_icon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from "./NotificationItemShape";

import {css, StyleSheet} from 'aphrodite';

const colorPrimary = '#E11D3F';
const styles = StyleSheet.create({
    Notification: {
        border: `1px dashed ${colorPrimary}`,
        position: 'absolute',
        padding: '0.5rem',
        width: '30rem',
        right: '2rem',
    },
    MenuItem: {
        textAlign: 'right',
        paddingRight: '2rem',
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
