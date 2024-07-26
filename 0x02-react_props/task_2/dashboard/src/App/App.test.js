import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';

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
