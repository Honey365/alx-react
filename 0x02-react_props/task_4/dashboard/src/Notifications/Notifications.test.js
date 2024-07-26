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
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        const listItems = wrapper.find(NotificationItem);
        expect(listItems).toHaveLength(3);
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
});
