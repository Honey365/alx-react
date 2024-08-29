import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export function selectCourse(index) {
    return {
        type: SELECT_COURSE,
        index: index,
    };
}

export function unSelectCourse (index) {
    return {
        type: UNSELECT_COURSE,
        index: index,
    };
}

export function boundSelectCourse(index) {
    return function(dispatch) {
        dispatch(selectCourse(index));
    };
}

export function boundUnSelectCourse(index) {
    return function(dispatch) {
        dispatch(unSelectCourse(index));
    };
}
