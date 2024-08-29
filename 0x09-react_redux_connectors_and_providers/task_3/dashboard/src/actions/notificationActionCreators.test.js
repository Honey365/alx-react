import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from "./notificationActionTypes";

import { markAsRead, setNotificationFilter } from "./notificationActionCreators";

describe("notificationActionCreators tests", () => {
    it("should return the right action for MARK_AS_READ", () => {
        const expectedAction = { type: MARK_AS_READ, index: 1 };
        expect(markAsRead(1)).toEqual(expectedAction);
    });

    it("should return right action for NotificationTypeFilters", () => {
        const expectedAction = { type: SET_TYPE_FILTER, filter: "DEFAULT"};
        expect(setNotificationFilter(NotificationTypeFilters["DEFAULT"])).toEqual(expectedAction);
    });
});
