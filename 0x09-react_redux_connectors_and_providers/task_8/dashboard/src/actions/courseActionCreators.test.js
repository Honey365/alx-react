import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";
import { selectCourse, unSelectCourse, setCourses, fetchCourses } from "./courseActionCreators";
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("courseActionCreators tests", () => {
    it("should return SELECT_COURSE action with right index", () => {
        const expectedAction = { type: SELECT_COURSE, index: 1 };

        expect(selectCourse(1)).toEqual(expectedAction);
    });

    it("should return UNSELECT_COURSE action with right index", () => {
        const expectedAction =  { type: UNSELECT_COURSE, index: 1 }
        expect(unSelectCourse(1)).toEqual(expectedAction);
    });
});

describe('fetchCourses test suite', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates FETCH_COURSE_SUCCESS when fetching courses has been done', () => {
        const mockCourses = [
            {id: 1, name: "ES6", isSelected: false, credit: 60,},
            {id: 2, name: "Webpack", isSelected: false, credit: 20,},
            {id: 3, name: "React", isSelected: false, credit: 40,},
        ];

        fetchMock.getOnce('http://localhost:8564/courses.json', {
            body: mockCourses,
            headers: { 'content-type': 'application/json' },
        });

        const expectedActions = [
            { type: 'FETCH_COURSE_SUCCESS', data: mockCourses },
        ];

        const store = mockStore({ courses: [] });
        return store.dispatch(fetchCourses()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('handles errors during fetch', () => {
        fetchMock.getOnce('http://localhost:8564/courses.json', {
            throws: new Error('Network error'),
        });

        const store = mockStore({ courses: [] });
        return store.dispatch(fetchCourses()).then(() => {
        });
    });
});
