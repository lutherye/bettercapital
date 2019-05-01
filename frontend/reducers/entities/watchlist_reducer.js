
import { RECEIVE_WATCHLISTS} from '../../actions/watchlist_actions';
import merge from 'lodash/merge';
import { LOGOUT_USER } from '../../actions/session_actions';

export default (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_WATCHLISTS:
            return merge([], state, Object.values(action.watchlists));
        case LOGOUT_USER:
            return [];
        default: return state;
    }
};