import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', function () {
    it('Login component renders without crashing', function () {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Login component renders two input tags and two labels', function () {
        const wrapper = shallow(<Login />);
        const inputTags = wrapper.find('input');
        const loginLabel = wrapper.find('label');

        expect(inputTags).toHaveLength(2);
        expect(loginLabel).toHaveLength(2);
    });
});
