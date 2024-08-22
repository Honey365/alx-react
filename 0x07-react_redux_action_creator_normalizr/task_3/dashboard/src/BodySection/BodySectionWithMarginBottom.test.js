import React from "react";
import { shallow } from "enzyme";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import BodySection from "./BodySection";
import {StyleSheetTestUtils} from "aphrodite";

describe("BodySectionWithMarginBottom rendering tests", () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it("should apply margin bottom to child component", () => {
        const wrapper = shallow(<BodySectionWithMarginBottom title="test title" />);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(BodySection)).toBeDefined();
        expect(wrapper.find(BodySection).html()).toEqual('<div class="bodySection"><h2>test title</h2></div>');
    });
});
