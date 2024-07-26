import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import { getLatestNotification } from "../utils/utils";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";

function Notifications({ displayDrawer}) {
    return (
        <React.Fragment>
            <div className="menuItem">
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                    <div className="Notifications">
                        <button type='button'
                                aria-label='Close'
                                onClick={() => console.log('Close button has been clicked')}
                                style={{
                                    background: "none",
                                    border: "none",
                                    position: "relative",
                                    right: "-94%",
                                    top: "-10%",
                                    cursor: "pointer"
                                }}>
                            <img src={close_icon} alt='Close icon' style={{width: '24px', height: '24px'}}/>
                        </button>
                        <p>Here is the list of notifications</p>
                        <ul>
                            <NotificationItem type={'default'} value={'New course available'}/>
                            <NotificationItem type={'urgent'} value={'New resume available'}/>
                            <NotificationItem type="urgent" html={{__html: getLatestNotification()}}/>
                        </ul>
                    </div>
            )}
        </React.Fragment>
    );

}

Notifications.defaultProps = {
    displayDrawer: false,
};

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
};

export default Notifications;
