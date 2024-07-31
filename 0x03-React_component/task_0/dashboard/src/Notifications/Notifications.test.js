import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import {getLatestNotification} from "../utils/utils";

describe('Notifications Component rendering tests', () => {
    it('renders <Notifications /> without crashing', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toBeDefined();
    });

   it('renders text "Here is the list of notifications"', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        const text = wrapper.find(".Notifications p").text();
        expect(text).toContain('Here is the list of notifications');
    });

    it('renders the menu item when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect( wrapper.find('.menuItem').exists()).toBe(true);
    });

    it('does not render div.Notifications when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect(wrapper.find('div.Notifications').exists()).toBe(false);
    });

    it('renders the menu item when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect(wrapper.find('.menuItem').exists()).toBe(true);
    });

    it('renders div.Notifications when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect( wrapper.find('div.Notifications').exists()).toBe(true);
    });

    it('renders correctly when listNotifications is empty', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
        expect(wrapper.find('ul').text()).toContain('No new notification for now');
    });

    it('renders correctly when listNotifications is not passed', () => {
        const wrapper = shallow(<Notifications displayDrawer={true}  />);
        expect(wrapper.find('ul').text()).toContain('No new notification for now');
    });

    it('renders correctly with right number of <NotificationItem /> items', () => {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: {__html: getLatestNotification()}},
        ];

        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
        const listItems = wrapper.find(NotificationItem);
        expect(listItems).toHaveLength(3);
    });

    it('does not render the "Here is the list of notifications" message when listNotifications is empty', () => {
        const wrapper = shallow(<Notifications listNotifications={[]} />);
        expect(wrapper.find('p').text()).not.toContain('Here is the list of notifications');
    });
});
