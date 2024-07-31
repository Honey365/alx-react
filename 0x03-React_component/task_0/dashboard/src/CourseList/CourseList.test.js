import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList component tests', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper).toBeDefined();
    });

    describe('tests when listCourses is Empty', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<CourseList />);
        });
        it('renders correctly if you pass an empty array', () => {
            const courseListRows = wrapper.find(CourseListRow);
            expect(courseListRows).toHaveLength(3);
        });
    });

    describe('tests when listCourses is not empty', () => {
        let wrapper;
        beforeEach(() => {
            const listCourses = [
                { id: 1, name: "ES6", credit: 60 },
                { id: 2, name: "Webpack", credit: 20 },
                { id: 3, name: "React", credit: 40 },
            ];
            wrapper = shallow(<CourseList listCourses={listCourses}/>);
        });
        it('renders correctly if you pass a non empty array', () => {
            const courseListRows = wrapper.find(CourseListRow);
            expect(courseListRows).toHaveLength(5);
        });
    });
});
