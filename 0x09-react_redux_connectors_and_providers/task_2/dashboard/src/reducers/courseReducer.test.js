import courseReducer from "./courseReducer";
import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE,
} from "../actions/courseActionTypes";
import { Map, fromJS } from 'immutable';


describe("courseReducer test", function () {

    it("returns the default state with an empty array",  () => {
        const initialState = new Map();
        const updatedState = courseReducer(new Map(), {});
        expect(updatedState).toEqual(initialState);
    });

    it('handles FETCH_COURSE_SUCCESS and returns the passed data', () => {
        const testData = [
            {id: 1, name: "ES6", credit: 60},
            {id: 2, name: "Webpack", credit: 20},
            {id: 3, name: "React", credit: 40},
        ];

        const initialState = new Map();
        const action = { type: FETCH_COURSE_SUCCESS, data: testData };
        const newState = courseReducer(initialState, action);

        testData.forEach(item => {
            expect(newState.has(item.id.toString()) === true).toEqual(true);
            expect(newState.get(item.id.toString()).isSelected === false).toEqual(true);
        });
    });

    it('handles SELECT_COURSE and updates the correct item in the data', () => {
        const testData = [
            {id: 1, name: "ES6", credit: 60, isSelected: false},
            {id: 2, name: "Webpack", credit: 20, isSelected: false},
            {id: 3, name: "React", credit: 40, isSelected: false},
        ];

        const initialState = Map(fromJS(testData).map(item => [item.get('id'), item]));
        const action = { type: SELECT_COURSE, index: 2 };
        const newState = courseReducer(initialState, action);

        expect(newState.toJS()).toEqual({"1": {"credit": 60, "id": 1, "isSelected": false, "name": "ES6"},
                "2": {"credit": 20, "id": 2, "isSelected": true, "name": "Webpack"},
                "3": {"credit": 40, "id": 3, "isSelected": false, "name": "React"}}
        );
    });

    it('handles UNSELECT_COURSE and updates the correct item in the data', () => {
        const testData = [
            {id: 1, name: "ES6", credit: 60, isSelected: true},
            {id: 2, name: "Webpack", credit: 20, isSelected: true},
            {id: 3, name: "React", credit: 40, isSelected: true},
        ];

        const initialState = Map(fromJS(testData).map(item => [item.get('id'), item]));

        const action = { type: UNSELECT_COURSE, index: 2 };
        const newState = courseReducer(initialState, action);

        expect(newState.toJS()).toEqual({"1": {"credit": 60, "id": 1, "isSelected": true, "name": "ES6"},
            "2": {"credit": 20, "id": 2, "isSelected": false, "name": "Webpack"},
            "3": {"credit": 40, "id": 3, "isSelected": true, "name": "React"}}
        );
    });

});
