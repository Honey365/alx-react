import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import CourseList from "../CourseList/CourseList";

describe('App Component rendering tests', () => {
    it('renders <App /> without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
    });

    it("contains Notifications component", () => {
        const component = shallow(<App />);
        expect(component.contains(<Notifications />)).toBe(true);
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
