import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE }
    from '../actions/courseActionTypes';


const initialState = [];
export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSE_SUCCESS:
            return action.data.map(function (course) {
                return { ...course, isSelected: false };
            });

        case SELECT_COURSE: {
            const { index } = action;
            return state.map(function (course) {
                return {
                    ...course,
                    isSelected: course.id === index ? true : course.isSelected,
                };
            });
        }

        case UNSELECT_COURSE: {
            const { index } = action;
            return state.map(function (course) {
                return {
                    ...course,
                    isSelected: course.id === index ? false : course.isSelected,
                };
            });
        }

        default:
            return state;
    }
}
