import {RECEIVE_USER, LOGOUT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullSession = {
    user: null,
};

export default (state = _nullSession, action) => {
    let newState;
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER:
            newState = merge({}, {userId: action.user.id});
            return newState;
        case LOGOUT_USER:
            return _nullSession;
        default: return state;
    }
};