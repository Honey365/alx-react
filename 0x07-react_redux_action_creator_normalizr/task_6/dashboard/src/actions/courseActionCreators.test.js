import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";
import { selectCourse, unSelectCourse } from "./courseActionCreators";

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
