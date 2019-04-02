
import {RECEIVE_CHART, RECEIVE_QUOTE} from '../../actions/asset_actions';
import merge from 'lodash/merge';

export default (state=[], action) => {
    
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CHART:
            return merge([], {[action.symbol]: action.chart});
        case RECEIVE_QUOTE:
            return merge({}, state, action.quote);
        default: return state;
    }
};
