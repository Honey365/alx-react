import React from "react";
import NotificationItem from "./NotificationItem";
import { shallow } from "enzyme";
import {StyleSheetTestUtils} from "aphrodite";

describe("Notification item rendering tests", () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it("renders NotificationItem component without crashing", () => {
        const wrapper = shallow(<NotificationItem />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correct output for type and value props', () => {
        const wrapper = shallow(<NotificationItem />);
        wrapper.setProps({ type: "default", value: "test" });
        expect(wrapper.html()).toEqual('<li data-notification-type="default" class="defaultNotification_cvq36q">test</li>');
    });

    it('renders correct output for html props', () => {
        const wrapper = shallow(<NotificationItem />);
        wrapper.setProps(
            {
                type: 'urgent',
                html: {
                    __html: "<u>test</u>"
                }
            }
        );
        expect(wrapper.html()).toEqual('<li data-notification-type="urgent" class="urgentNotification_iuuqm8"><u>test</u></li>');
    });

    it('calls markAsRead with the correct ID when simulating a click', () => {
        const markAsReadSpy = jest.fn();
        const id = 100;
        const wrapper = shallow(<NotificationItem />);
        wrapper.setProps({ value: "test item", markAsRead: markAsReadSpy, id: id });
        wrapper.find('li').simulate('click');
        expect(markAsReadSpy).toHaveBeenCalledWith(id);
        expect(markAsReadSpy).toBeCalledTimes(1);
        markAsReadSpy.mockRestore();
    });
});
