
import { RECEIVE_WATCHLISTS, REMOVE_WATCHLIST, RECEIVE_WATCHONE } from '../../actions/watchlist_actions';
import merge from 'lodash/merge';
import { LOGOUT_USER } from '../../actions/session_actions';

export default (state = [], action) => {
    let newState = merge([], state);
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_WATCHLISTS:
            return merge([], state, Object.values(action.watchlists));
        case REMOVE_WATCHLIST:
            const idx = state.indexOf(action.id);
            newState.splice(idx,1);
            return newState;
        case RECEIVE_WATCHONE:
            newState.push(action.watchone);
            return newState;
        case LOGOUT_USER:
            return [];
        default: return state;
    }
};