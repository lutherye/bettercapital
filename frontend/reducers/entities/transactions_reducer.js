
import { RECEIVE_TRANSACTION } from '../../actions/transaction_actions';
import merge from 'lodash/merge';
import { LOGOUT_USER } from '../../actions/session_actions';

export default (state=[], action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_TRANSACTION:
            return merge([], state, Object.values(action.transaction));
        case LOGOUT_USER:
            return [];
        default: return state;
    }
};
