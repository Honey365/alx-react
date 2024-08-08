import React from "react";
import NotificationItem from "./NotificationItem";
import { shallow } from "enzyme";

describe("Notification item rendering tests", () => {
    it("renders NotificationItem component without crashing", () => {
        const wrapper = shallow(<NotificationItem />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correct output for type and value props', () => {
        const wrapper = shallow(<NotificationItem />);
        wrapper.setProps({ type: "default", value: "test" });
        expect(wrapper.html()).toEqual('<li data-notification-type="default">test</li>');
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
        expect(wrapper.html()).toEqual('<li data-notification-type="urgent"><u>test</u></li>');
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
