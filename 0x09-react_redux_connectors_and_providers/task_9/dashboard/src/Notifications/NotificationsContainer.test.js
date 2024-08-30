/**
 * @jest-environment jsdom
 */

import React from 'react';
import {shallow} from 'enzyme';
import { NotificationsContainer } from './NotificationsContainer';


describe("<NotificationsContainer />", () => {
    it("makes sure the fetching is happening on mount", () => {
        const fetchNotifications = jest.fn();
        shallow(<NotificationsContainer fetchNotifications={fetchNotifications} />);
        expect(fetchNotifications).toHaveBeenCalled();
        jest.restoreAllMocks();
    });
});
