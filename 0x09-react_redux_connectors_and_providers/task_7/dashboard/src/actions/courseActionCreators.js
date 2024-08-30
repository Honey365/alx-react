import {FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE} from './courseActionTypes';

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

export function setCourses(data) {
    return {
        type: FETCH_COURSE_SUCCESS,
        data,
    };
}

export function fetchCourses() {
    return function (dispatch) {
        return fetch("http://localhost:8564/courses.json")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                dispatch(setCourses(data));
            })
            .catch(function (error) {
            });
    };
}
