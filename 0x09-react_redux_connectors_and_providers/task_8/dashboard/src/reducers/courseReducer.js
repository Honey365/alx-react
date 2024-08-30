import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';
import {Map, setIn} from 'immutable';


export const initialState = Map();

export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSE_SUCCESS: {
            const data = action.data.map(course => ({ ...course, isSelected: false }));
            const normalizedData = coursesNormalizer(data);
            return state.merge(normalizedData);
        }

        case SELECT_COURSE: {
            return setIn(state, [action.index, 'isSelected'], true);
        }

        case UNSELECT_COURSE: {
            return setIn(state, [action.index, 'isSelected'], false);
        }

        default:
            return state;
    }
}
