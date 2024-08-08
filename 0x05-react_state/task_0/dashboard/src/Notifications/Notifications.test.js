import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import {getLatestNotification} from "../utils/utils";
import {StyleSheetTestUtils} from "aphrodite";

describe('Notifications Component rendering tests', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('renders <Notifications /> without crashing', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toBeDefined();
    });

   it('renders text "Here is the list of notifications"', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        const text = wrapper.find('p').last().text();
        expect(text).toContain('Here is the list of notifications');
    });

    it('renders the menu item when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect( wrapper.find('div').exists()).toBe(true);
    });

    it('does not render div.Notifications when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect(wrapper.find('div.menuItem').exists()).toBe(false);
    });

    it('renders the menu item when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect(wrapper.find('div').exists()).toBe(true);
    });

    it('renders div.Notifications when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect( wrapper.find('div').exists()).toBe(true);
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

    it('checks that when calling the function markAsRead, the spy is being called with the right message', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');

        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ];

        const wrapper = shallow(<Notifications displayDrawer listNotifications={listNotifications} />);
        const instance = wrapper.instance();
        instance.markAsRead(listNotifications[2].id);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Notification ${listNotifications[2].id} has been marked as read`);
        consoleLogSpy.mockRestore();
    });

    it("checks that the component does not render when updated with same list", () => {
        const initialNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", value: "Urgent update is available" },
        ];
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialNotifications} />);
        expect(wrapper.instance().shouldComponentUpdate(initialNotifications)).toBe(true);
    });

    it("checks that the component renders when updated with a longer list", () => {
        const initialNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", value: "Urgent update is available" },
        ];

        const updatedNotifications = [
            ...initialNotifications,
            { id: 4, type: 'default', value: 'New update is available' },
        ];

        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialNotifications} />);
        expect(wrapper.instance().shouldComponentUpdate(updatedNotifications)).toBe(true);
    });

    it("calls handleDisplayDrawer after clicking on the menu item", () => {
        const handleDisplayDrawer = jest.fn();
        const handleHideDrawer = jest.fn();
        const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer}
                                               handleHideDrawer={handleHideDrawer} />);
        wrapper.find("div").at(0).simulate("click");
        expect(handleDisplayDrawer).toHaveBeenCalled();
        jest.restoreAllMocks();
    });

    it("calls handleHideDrawer after clicking on the close button", () => {
        const handleDisplayDrawer = jest.fn();
        const handleHideDrawer = jest.fn();

        const wrapper = shallow(<Notifications displayDrawer={true}
                                               handleDisplayDrawer={handleDisplayDrawer}
                                               handleHideDrawer={handleHideDrawer} />);
        wrapper.find("button").at(0).simulate("click");
        expect(handleHideDrawer).toHaveBeenCalled();
        jest.restoreAllMocks();
    });


});
