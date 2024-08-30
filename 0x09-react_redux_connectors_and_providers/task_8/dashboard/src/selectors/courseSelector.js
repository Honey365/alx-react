import { List } from 'immutable';

const getCoursesList = function(state) {
    const courseEntities = state.courses;

    return List(courseEntities.valueSeq());
};

export default getCoursesList;
