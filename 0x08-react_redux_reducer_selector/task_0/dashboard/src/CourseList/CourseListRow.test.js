import React from "react";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";
import {StyleSheetTestUtils} from "aphrodite";

describe('CourseListRow component tests', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('renders one cell with colspan=2 when textSecondCell does not exist when isHeader is true)', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Test Header" />);
        expect(wrapper.html()).toBe("<tr class=\"row_y7r86x\"><th class=\"header_dswxah\" colSpan=\"2\">Test Header</th></tr>");
    });

    it('renders two cells when textSecondCell is present when isHeader is true', () => {
        const wrapper = shallow(
            <CourseListRow isHeader={true} textFirstCell="First Header" textSecondCell="Second Header" />
        );
        expect(wrapper.html()).toBe("<tr class=\"row_y7r86x\"><th class=\"header_dswxah\">First Header</th><th class=\"header_dswxah\">Second Header</th></tr>");
    });

    it('renders correctly two td elements within a tr element when isHeader is false', () => {
        const wrapper = shallow(
            <CourseListRow isHeader={false} textFirstCell="First Cell" textSecondCell="Second Cell" />
        );
        expect(wrapper.html()).toBe('<tr class="row_y7r86x"><td><input type="checkbox"/>First Cell</td><td>Second Cell</td></tr>');
    });
});
