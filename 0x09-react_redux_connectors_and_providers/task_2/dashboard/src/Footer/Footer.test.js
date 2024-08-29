/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer';
import { AppContext } from "../App/AppContext";

describe('Footer', function () {
    it('Footer component renders without crashing', function () {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders text "Copyright', function () {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('div.footer p')).toHaveLength(1);
        expect(wrapper.find('div.footer p').text()).toContain('Copyright');
    });

    it('does not displayed contact us link when the user is logged out', function () {
        const context = {
            user: {
                email: '',
                password: '',
                isLoggedIn: false
            }
        };
        const wrapper = shallow(
            <AppContext.Provider value={context}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('a').exists()).toEqual(false);

    });

    it('displays the contact us link when the user is logged in', function () {
        const wrapper = shallow(<Footer user={{ email: 'test', password: 'test' }}/>);
        const contactLink = wrapper.find('a');
        expect(contactLink).toHaveLength(1);
    });
});
