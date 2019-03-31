
import {RECEIVE_CHART} from '../../actions/asset_actions';
import merge from 'lodash/merge';

export default (state=[], action) => {

    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CHART:
            return merge([], action.chart);
        default: return state;
    }
};
