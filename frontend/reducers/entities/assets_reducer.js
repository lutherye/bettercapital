
import {RECEIVE_CHART, RECEIVE_QUOTE, RECEIVE_SYMBOL, RECEIVE_NEWS, RECEIVE_COMPANY, RECEIVE_CHARTS, RECEIVE_PRICE} from '../../actions/asset_actions';
import merge from 'lodash/merge';

export default (state={}, action) => {
    
    Object.freeze(state);
    let newState = merge({}, state);
    switch(action.type){
        case RECEIVE_CHART: 
            delete newState[action.symbol];
                return merge({}, newState, { [action.symbol]: action.chart });
        case RECEIVE_CHARTS:
            delete newState["charts"];
            return merge({}, newState, { charts: action.charts });
        case RECEIVE_QUOTE:
            delete newState["quote"];
            return merge({}, state, { quote: action.quote });
        case RECEIVE_PRICE:
            return merge({}, state, {[action.symbol]: action.price});
        case RECEIVE_SYMBOL:
            return merge({}, state, { symbols: action.symbols });
        case RECEIVE_NEWS:
            return merge({}, state, { news: action.news });
        case RECEIVE_COMPANY:
            delete newState["company"];
            return merge({}, state, { company: action.company});
        default: return state;
    }
};
