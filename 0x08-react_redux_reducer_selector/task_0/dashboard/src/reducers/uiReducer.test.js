import uiReducer from './uiReducer';
import { selectCourse } from '../actions/courseActionCreators';
import { displayNotificationDrawer } from '../actions/uiActionCreators';


describe('uiReducer Tests', function() {
    const initialState = {
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: {}
    };

    it('returns the initial state when no action is passed', () => {
        const returnedState = uiReducer(initialState, {});
        expect(returnedState).toEqual(initialState);
    });

    it('returns the initial state when the action SELECT_COURSE is passed', () => {
        const returnedState = uiReducer(initialState, selectCourse(3));
        expect(returnedState).toEqual(initialState);
    });

    it('returns correct state when DISPLAY_NOTIFICATION_DRAWER is passed',() => {
        const returnedState = uiReducer(initialState, displayNotificationDrawer());
        expect(returnedState.isNotificationDrawerVisible).toEqual(true);
    });
});

