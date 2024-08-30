import rootReducer from './rootReducer';
import { Map } from 'immutable';

describe('rootReducer', () => {
    it('should have the correct initial state structure', () => {
        const initialState = rootReducer(undefined, {});
        const expectedInitialState = {
            courses: Map({}),
            notifications: Map({}),
            ui: Map({}),
        };
        expect(initialState.ui).toBeInstanceOf(Map);
        expect(initialState.courses).toBeInstanceOf(Map);
        expect(initialState.notifications).toBeInstanceOf(Map);

    });
});
