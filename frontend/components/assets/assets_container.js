import { connect } from 'react-redux';
import { fetChart, fetQuote } from '../../actions/asset_actions';
import Asset from './assets';

const msp = (state) => {
    const chart = state.entities.assets;
    return({
        chart,
        symbol: Object.keys(chart)[0],
    });
};

const mdp = dispatch => {
    return ({
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: symbol => dispatch(fetQuote(symbol)),
    });
};


export default connect(msp,mdp)(Asset);