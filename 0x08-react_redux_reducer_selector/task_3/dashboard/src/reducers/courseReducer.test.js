import courseReducer from "./courseReducer";
import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE,
} from "../actions/courseActionTypes";

describe("courseReducer test", function () {

    it("returns the default state with an empty array",  () => {
        const state = courseReducer(undefined, {});
        expect(state).toEqual([]);
    });

    it('handles FETCH_COURSE_SUCCESS and returns the passed data', () => {
        const testData = [
            {id: 1, name: "ES6", credit: 60},
            {id: 2, name: "Webpack", credit: 20},
            {id: 3, name: "React", credit: 40},
        ];

        const action = { type: FETCH_COURSE_SUCCESS, data: testData };
        const newState = courseReducer(undefined, action);
        expect(newState).toEqual(testData.map(course => ({ ...course, isSelected: false })));
    });

    it('handles SELECT_COURSE and updates the correct item in the data', () => {
        const initialState = [
            {id: 1, name: "ES6", credit: 60, isSelected: false},
            {id: 2, name: "Webpack", credit: 20, isSelected: false},
            {id: 3, name: "React", credit: 40, isSelected: false},
        ];

        const action = { type: SELECT_COURSE, index: 2 };
        const newState = courseReducer(initialState, action);

        expect(newState).toEqual([
            {id: 1, name: "ES6", credit: 60, isSelected: false},
            {id: 2, name: "Webpack", credit: 20, isSelected: true},
            {id: 3, name: "React", credit: 40, isSelected: false},
        ]);
    });

    it('handles UNSELECT_COURSE and updates the correct item in the data', () => {
        const initialState = [
            {id: 1, name: "ES6", credit: 60, isSelected: true},
            {id: 2, name: "Webpack", credit: 20, isSelected: true},
            {id: 3, name: "React", credit: 40, isSelected: true},
        ];

        const action = { type: UNSELECT_COURSE, index: 2 };
        const newState = courseReducer(initialState, action);

        expect(newState).toEqual([
            {id: 1, name: "ES6", credit: 60, isSelected: true},
            {id: 2, name: "Webpack", credit: 20, isSelected: false},
            {id: 3, name: "React", credit: 40, isSelected: true},
        ]);
    });

});
