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
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, defaultUser } from "./AppContext";
import {act} from "react-dom/test-utils";


describe('App Component rendering tests', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

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

        const wrapper = shallow(<App />);
        const notificationsComponent = wrapper.find(Notifications);
        expect(notificationsComponent).toHaveLength(1);
        expect(notificationsComponent.props().listNotifications).toEqual(listNotifications);
    });

    it("contains Header component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Header />)).toBe(true);
    });

    it("contains Login Component", () => {
        const component = shallow(<App />);
        expect(component.find(Login)).toHaveLength(1);
    });

    it("contains Footer component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Footer />)).toBe(true);
    });

    it("has false as the default state for displayDrawer", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().displayDrawer).toEqual(false);
    });

    it("displayDrawer changes to true after calling handleDisplayDrawer", () => {
        const wrapper = shallow(<App />);
        wrapper.instance().handleDisplayDrawer();
        expect(wrapper.state().displayDrawer).toEqual(true);
    });

    it("displayDrawer changes to false after calling handleDisplayDrawer", () => {
        const wrapper = shallow(<App />);
        wrapper.instance().handleDisplayDrawer();
        expect(wrapper.state().displayDrawer).toEqual(true);
        wrapper.instance().handleHideDrawer();
        expect(wrapper.state().displayDrawer).toEqual(false);
    });

    it('markNotificationAsRead works as intended', function () {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: {__html: getLatestNotification()}},
        ];

        const wrapper = shallow(<App />);
        wrapper.setState({listNotifications: listNotifications});
        wrapper.instance().markNotificationAsRead(1);
        const newListNotifications = listNotifications.slice(1);
        expect(wrapper.state('listNotifications')).toEqual(newListNotifications);
    });
});

describe('When App isLoggedin is True', function () {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('does not render Login component', function () {
        const wrapper = shallow(<App />);
        wrapper.setState({user: {email: 'me@me.com', password: '123456', isLoggedIn: true}});
        expect(wrapper.find(Login).length).toBe(0);
    });

    it('renders the CourseList component', function () {
        const wrapper = shallow(<App />);
        wrapper.setState({user: {email: 'me@me.com', password: '123456', isLoggedIn: true}});
        expect(wrapper.find(CourseList).length).toBe(1);
    });
});

describe('When Ctrl + h is pressed', () => {
    let logOutMock;
    let alertSpy;

    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
        logOutMock = jest.fn();
        alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        alertSpy.mockRestore();
        jest.clearAllMocks();
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('checks that the alert method is called', () => {

        act(() => {
            const  wrapper = mount(<App />);
            const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
            document.dispatchEvent(event);
            expect(alertSpy).toHaveBeenCalled();
        });
    });

    it('checks that the message on the called alert function is "Logging you out"', () => {
        act(() => {
            const wrapper = mount(<App />);
            const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
            document.dispatchEvent(event);
            expect(alertSpy).toHaveBeenCalledWith('Logging you out');
        });
    });

});

describe('state updating checks', () => {

    it('updates state variables correctly when logIn function is called', () => {
        const wrapper = shallow(<App />);
        wrapper.instance().logIn("me@me.com", '123456');
        expect(wrapper.state().user).toEqual({email: 'me@me.com', password: '123456', isLoggedIn: true});
    });

    it('updates state variables correctly when logOut function is called', () => {
        const wrapper = shallow(<App />);
        wrapper.instance().logIn("me@me.com", "123456");
        expect(wrapper.state().user).toEqual({email: 'me@me.com', password: '123456', isLoggedIn: true});
        wrapper.instance().state.logOut();
        expect(wrapper.state().user).toEqual({email: '', password: '', isLoggedIn: false});
    });

});
jest.useFakeTimers();
jest.runAllTimers();