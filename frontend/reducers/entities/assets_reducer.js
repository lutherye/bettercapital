
import {RECEIVE_CHART, RECEIVE_QUOTE, RECEIVE_SYMBOL, RECEIVE_NEWS, RECEIVE_COMPANY, RECEIVE_CHARTS} from '../../actions/asset_actions';
import merge from 'lodash/merge';

export default (state={}, action) => {
    
    Object.freeze(state);
    let newState;
    switch(action.type){
        case RECEIVE_CHART: 
             newState = merge({}, state);
            delete newState[action.symbol];
                return merge({}, newState, { [action.symbol]: action.chart });
        case RECEIVE_CHARTS:
        newState = merge({}, state);
        debugger
            delete newState["charts"];
            debugger
            return merge({}, newState, { charts: action.charts });
        case RECEIVE_QUOTE:
            return merge({}, state, action.quote);
        case RECEIVE_SYMBOL:
            return merge({}, state, { symbols: action.symbols });
        case RECEIVE_NEWS:
            return merge({}, state, { news: action.news });
        case RECEIVE_COMPANY:
            return merge({}, state, { company: action.company});
        default: return state;
    }
};
