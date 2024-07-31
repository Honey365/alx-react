import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', function () {
    it('Footer component renders without crashing', function () {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('Footer components renders the text "Copyright"', function () {
        const wrapper = shallow(<Footer />);
        expect(wrapper.text()).toContain('Copyright');
    });
});
