/**
 * @jest-environment jsdom
 */
import React from 'react';
import {mount, shallow} from 'enzyme';
import { CourseList } from './CourseList';
import CourseListRow from './CourseListRow';
import {StyleSheetTestUtils} from "aphrodite";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({}); // Pass an initial state that matches your Redux store structure


describe('CourseList component tests', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<CourseList listCourses={[]} />);
        expect(wrapper.exists()).toEqual(true);
    });

    describe('tests when listCourses is Empty', () => {
        it('renders correctly if you pass an empty array', () => {
            const wrapper = shallow(<CourseList />);
            const courseListRows = wrapper.find(CourseListRow);
            expect(courseListRows).toEqual({});
        });
    });

    describe('tests when listCourses is not empty', () => {
        it('renders correctly if you pass a non empty array', () => {
            const listCourses = [
                { id: 1, name: "ES6", credit: 60 },
                { id: 2, name: "Webpack", credit: 20 },
                { id: 3, name: "React", credit: 40 },
            ];
            const wrapper = shallow(<CourseList listCourses={ listCourses} />);
            const courseListRows = wrapper.find(CourseListRow);
            expect(courseListRows).toHaveLength(5);
        });
    });

    it('dispatches selectCourse when checked is true', () => {
        const mockSelectCourse = jest.fn();
        const rowId = 100;
        const wrapper = mount(<CourseList listCourses={[]} selectCourse={mockSelectCourse}/>);
        wrapper.instance().onChangeRow(rowId, true);
        expect(mockSelectCourse).toHaveBeenCalledWith(rowId);
    });

    it('dispatches unSelectCourse when checked is false', () => {
        const mockUnSelectCourseMock = jest.fn();
        const rowId = 200;
        const wrapper = mount(<CourseList listCourses={[]} unSelectCourse={mockUnSelectCourseMock}/>);
        wrapper.instance().onChangeRow(rowId, false);
        expect(mockUnSelectCourseMock).toHaveBeenCalledWith(rowId);
    });
});
