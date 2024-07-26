import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications Component rendering tests', () => {
    it('renders <Notifications /> without crashing', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toBeDefined();
    });

    it('renders three <li> items', () => {
        const wrapper = shallow(<Notifications />);
        const listItems = wrapper.find(NotificationItem);
        expect(listItems).toHaveLength(3);
    });

    it('renders text "Here is the list of notifications"', () => {
        const wrapper = shallow(<Notifications />);
        const text = wrapper.find("p").text();
        expect(text).toContain('Here is the list of notifications');
    });
});
