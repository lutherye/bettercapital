import {RECEIVE_USER, LOGOUT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullSession = {
    currentUser: null,
};

export default (state = _nullSession, action) => {
    let newState;
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER:
            newState = merge({}, {currentUser: action.user});
            return newState;
        case LOGOUT_USER:
            return _nullSession;
        default: return state;
    }
};