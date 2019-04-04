
import { RECEIVE_TRANSACTION } from '../../actions/transaction_actions';
import merge from 'lodash/merge';

export default (state=[], action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_TRANSACTION:
            return merge([], state, Object.values(action.transaction));
        default: return state;
    }
};
