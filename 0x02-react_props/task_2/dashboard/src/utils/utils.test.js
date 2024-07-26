import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('getFullYear', () => {
    test("returns current year", () => {
        expect(getFullYear()).toBe(new Date().getFullYear());
    });
});

describe('getFooterCopy', () => {
   test("returns correct footer text", () => {
        expect(getFooterCopy(true)).toBe("Holberton School");
        expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
    });
});

describe('getLatestNotification', () => {
    test("returns correct latest notification", () => {
        expect(getLatestNotification()).toBe("<strong>Urgent requirement</strong> - complete by EOD");
    });
});
