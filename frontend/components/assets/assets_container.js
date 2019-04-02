import { connect } from 'react-redux';
import { fetChart, fetQuote } from '../../actions/asset_actions';
import Asset from './assets';

const msp = (state, ownProps) => {
    const chart = state.entities.assets;
    const id = ownProps.match.params.symbol;
    return({
        chart,
        symbol: Object.keys(chart)[0],
        id,
    });
};

const mdp = dispatch => {
    return ({
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: symbol => dispatch(fetQuote(symbol)),
    });
};


export default connect(msp,mdp)(Asset);