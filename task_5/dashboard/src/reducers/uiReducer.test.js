import uiReducer from './uiReducer';
import { selectCourse } from '../actions/courseActionCreators';
import { displayNotificationDrawer } from '../actions/uiActionCreators';
import { Map } from 'immutable';



describe('uiReducer Tests', function () {
    const initialState = Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: {},
    });

    it('returns the initial state when no action is passed', () => {
        const returnedState = uiReducer(initialState, {});
        expect(returnedState.toJS()).toEqual(initialState.toJS());
    });

    it('returns the initial state when the action SELECT_COURSE is passed', () => {
        const returnedState = uiReducer(initialState, selectCourse(3));
        expect(returnedState.toJS()).toEqual(initialState.toJS());
    });

    it('returns correct state when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
        const returnedState = uiReducer(initialState, displayNotificationDrawer());
        expect(returnedState.get('isNotificationDrawerVisible')).toEqual(true);
    });
});

