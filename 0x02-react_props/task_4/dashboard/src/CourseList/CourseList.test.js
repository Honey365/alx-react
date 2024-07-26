import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList component tests', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper).toBeDefined();
    });

    it('renders 5 different rows', () => {
        const wrapper = shallow(<CourseList />);
        const courseListRows = wrapper.find(CourseListRow);
        expect(courseListRows.length).toBe(5);
    });
});
