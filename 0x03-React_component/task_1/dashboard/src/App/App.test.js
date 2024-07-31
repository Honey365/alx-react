/**
 * @jest-environment jsdom
 */
import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import CourseList from "../CourseList/CourseList";
import {getLatestNotification} from "../utils/utils";

describe('App Component rendering tests', () => {
    it('renders <App /> without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
    });

    it("contains Notifications component", () => {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: {__html: getLatestNotification()}},
        ];
        const component = shallow(<App />);
        expect(component.contains(<Notifications listNotifications={listNotifications}/>)).toBe(true);
    });

    it("contains Header component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Header />)).toBe(true);
    });

    it("contains Login Component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Login />)).toBe(true);
    });

    it("contains Footer component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Footer />)).toBe(true);
    });

});

describe('When App isLoggedin is True', function () {
    it('does not render Login component', function () {
        const wrapper = shallow(<App isLoggedIn={true} />);
        expect(wrapper.find(Login).length).toBe(0);
    });

    it('renders the CourseList component', function () {
        const wrapper = shallow(<App isLoggedIn={true} />);
        expect(wrapper.find(CourseList).length).toBe(1);
    });
});


describe('When Ctrl + h is pressed', () => {
    let logOutMock;
    let alertSpy;

    beforeEach(() => {
        logOutMock = jest.fn();
        alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        alertSpy.mockRestore();
        jest.clearAllMocks();
    });

    it('checks that logOut function is called', () => {
        const wrapper = mount(<App logOut={logOutMock} />);
        const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
        document.dispatchEvent(event);
        expect(logOutMock).toHaveBeenCalledTimes(1);
        wrapper.unmount();
    });

    it('checks that the alert method is called', () => {
        const wrapper = mount(<App />);
        const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
        document.dispatchEvent(event);
        expect(alertSpy).toHaveBeenCalled();
        wrapper.unmount();
    });

    it('checks that the message on the called alert function is "Logging you out"', () => {
        const wrapper = mount(<App />);
        const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
        document.dispatchEvent(event);
        expect(alertSpy).toHaveBeenCalledWith('Logging you out');
        wrapper.unmount();
    });

    afterAll(() => {
        alertSpy.mockRestore();
        jest.clearAllMocks();
    });
});
