import React from "react";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";

describe('CourseListRow component tests', () => {
    it('renders one cell with colspan=2 when textSecondCell does not exist when isHeader is true)', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Test Header" />);
        expect(wrapper.html()).toBe('<tr><th colSpan="2">Test Header</th></tr>');
    });

    it('renders two cells when textSecondCell is present when isHeader is true', () => {
        const wrapper = shallow(
            <CourseListRow isHeader={true} textFirstCell="First Header" textSecondCell="Second Header" />
        );
        expect(wrapper.html()).toBe('<tr><th>First Header</th><th>Second Header</th></tr>');
    });

    it('renders correctly two td elements within a tr element when isHeader is false', () => {
        const wrapper = shallow(
            <CourseListRow isHeader={false} textFirstCell="First Cell" textSecondCell="Second Cell" />
        );
        expect(wrapper.html()).toBe('<tr><td>First Cell</td><td>Second Cell</td></tr>');
    });
});
