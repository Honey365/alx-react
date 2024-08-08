import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import {StyleSheetTestUtils} from "aphrodite";

describe("Header", () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it("render <Header /> without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists()).toEqual(true);
    });

    it("should render a <h1 />", () => {
        const wrapper = shallow(<Header />);
        const h1 = wrapper.find('h1');
        expect(h1.exists()).toBe(true);
    });

    it("should render a <img />", () => {
        const wrapper = shallow(<Header />);
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
    });

});
