import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from "./uiActionTypes";

import { login, logout, hideNotificationDrawer, displayNotificationDrawer } from "./uiActionCreators";

describe("uiActionCreators", () => {
    it("should return proper action for LOGIN", () => {
        const email = "me@me.com";
        const password = "123456";
        const expectedAction = { type: LOGIN, user: { email: email, password: password }};
        expect(login(email, password)).toEqual(expectedAction);
    });

    it("should return proper action for LOGOUT", () => {
        const expectedAction = { type: LOGOUT };
        expect(logout()).toEqual(expectedAction);
    });

    it("should return proper action for DISPLAY_NOTIFICATION_DRAWER", () => {
        const expectedAction = { type: DISPLAY_NOTIFICATION_DRAWER };
        expect(displayNotificationDrawer()).toEqual(expectedAction);
    });

    it("should return proper action for HIDE_NOTIFICATION_DRAWER", () => {
        const expectedAction = { type: HIDE_NOTIFICATION_DRAWER };
        expect(hideNotificationDrawer()).toEqual(expectedAction);
    });
});
