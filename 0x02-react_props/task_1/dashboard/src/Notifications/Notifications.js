import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import { getLatestNotification } from "../utils/utils";

function Notifications() {
    return (
        <div className='Notifications'>
            <p>Here is the list of notifications</p>
            <button  type='button'
                     aria-label='Close'
                     onClick={() => console.log('Close button has been clicked')}
                     style={{
                         background: "none",
                         border: "none",
                         position: "absolute",
                         right: "4%",
                         top: "2%",
                         cursor: "pointer"
                        }}>
                <img src={close_icon} alt='Close icon' style={{ width: '24px', height: '24px' }}/>
            </button>
            <ul>
                <li data="default">New course available</li>
                <li data="urgent">New resume available</li>
                <li data="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
            </ul>
        </div>
    );
}

export default Notifications;
