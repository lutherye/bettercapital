import { connect } from 'react-redux';
import { fetChart } from '../../actions/asset_actions';
import Asset from './assets';

const msp = (state) => {
    return({
        chart: state.entities.assets,
    });
};

const mdp = dispatch => {
    return ({
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range))
    });
};


export default connect(msp,mdp)(Asset);