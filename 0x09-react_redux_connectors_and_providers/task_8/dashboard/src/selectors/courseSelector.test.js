import getCoursesList from './courseSelector';
import {fromJS, List, Map} from 'immutable';

describe('courseSelector test suite', () => {
    it('should return a List of course entities', () => {
        const state = {
            courses: fromJS([
                {id: 1, name: "ES6", isSelected: false, credit: 60,},
                {id: 2, name: "Webpack", isSelected: false, credit: 20,},
                {id: 3, name: "React", isSelected: false, credit: 40,},
            ]),
        };

        const expectedResult = [
            {id: 1, name: "ES6", isSelected: false, credit: 60,},
            {id: 2, name: "Webpack", isSelected: false, credit: 20,},
            {id: 3, name: "React", isSelected: false, credit: 40,},
        ];
        const selected = getCoursesList(state);
        expect(selected.toJS()).toEqual(expectedResult);
    });

});
