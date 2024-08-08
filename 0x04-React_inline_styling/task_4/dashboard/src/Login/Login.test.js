import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import {StyleSheetTestUtils} from "aphrodite";

describe('Login', function () {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('Login component renders without crashing', function () {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Login component renders two labels', function () {
        const wrapper = shallow(<Login />);
        const inputTags = wrapper.find('input');
        expect(inputTags).toHaveLength(2);
    });

    it('Login component renders two input', function () {
        const wrapper = shallow(<Login />);
        const loginLabel = wrapper.find('label');
        expect(loginLabel).toHaveLength(2);
    });
});
