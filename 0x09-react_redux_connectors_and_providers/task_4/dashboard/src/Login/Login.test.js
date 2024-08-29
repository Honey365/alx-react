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
        const labelTags = wrapper.find('label');
        expect(labelTags).toHaveLength(2);
    });

    it('Login component renders two input', function () {
        const wrapper = shallow(<Login />);
        const loginLabel = wrapper.find('label');
        expect(loginLabel).toHaveLength(2);
    });

    it("should have submit button disabled by default", () => {
        const wrapper = shallow(<Login />);
        const submitButton = wrapper.find("input[type='submit']");
        expect(submitButton).toBeDefined();
        expect(submitButton.prop('disabled')).toBe(true);
    });

    it("should have submit button enabled after changing the value of the two inputs", () => {
        const wrapper = shallow(<Login />);
        wrapper.find("#email").simulate("change", { target: { value: "u" } });
        wrapper.find("#password").simulate("change", { target: { value: "1" } });
        const submitButton = wrapper.find("input[type='submit']");
        expect(submitButton).toBeDefined();
        expect(submitButton.prop('disabled')).toBe(false);
    });
});
