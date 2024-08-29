/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Footer from './Footer';
import { AppContext } from "../App/AppContext";


describe('Footer', function () {
    it('Footer component renders without crashing', function () {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders text "Copyright', function () {
        const context = {
            user: {
                email: '',
                password: '',
                isLoggedIn: false
            }
        };
        const wrapper = mount(
            <AppContext.Provider value={context}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.text()).toContain('Copyright');
    });

    it('does not displayed contact us link when the user is logged out', function () {
        const context = {
            user: {
                email: '',
                password: '',
                isLoggedIn: false
            }
        };
        const wrapper = mount(
            <AppContext.Provider value={context}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('a').exists()).toEqual(false);

    });

    it('displays the contact us link when the user is logged in', function () {
        const context = {
            user: {
                email: 'me@me.com',
                password: '123456',
                isLoggedIn: true
            }
        };
        const wrapper = mount(
            <AppContext.Provider value={context}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('a').exists()).toEqual(true);
    });
});
