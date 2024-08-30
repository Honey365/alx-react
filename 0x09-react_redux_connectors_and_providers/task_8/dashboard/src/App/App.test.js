/**
 * @jest-environment jsdom
 */
import React from "react";
import { shallow } from "enzyme";
import { App, mapStateToProps} from "./App";
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import CourseList from "../CourseList/CourseList";
import {getLatestNotification} from "../utils/utils";
import { StyleSheetTestUtils } from 'aphrodite';
import {fromJS} from "immutable";


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
});

describe('When App isLoggedin is True', function () {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('does not render Login component', function () {
        const wrapper = shallow(<App isLoggedIn />);
        expect(wrapper.find(Login).length).toBe(0);
    });

    it('renders the CourseList component', function () {
        const wrapper = shallow(<App isLoggedIn />);
        expect(wrapper.find(CourseList).length).toBe(1);
    });
});

describe('mapStateToProps tests', () => {
    it('returns the right object when passing the state', function () {
        const state = {
            ui: fromJS({
                isUserLoggedIn: true,
            }),
        };
        const { isLoggedIn, displayDrawer } = mapStateToProps(state);
        expect({ isLoggedIn, displayDrawer }).toEqual({
            isLoggedIn: state.ui.get('isUserLoggedIn'),
            displayDrawer: state.ui.get('isNotificationDrawerVisible'),
        });
    });

});


jest.useFakeTimers();
jest.runAllTimers();
