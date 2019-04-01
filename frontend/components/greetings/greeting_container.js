import { connect } from 'react-redux';
import { fetChart } from '../../actions/asset_actions';
import {logout} from '../../actions/session_actions';
import Greeting from './greeting';

const msp = (state) => {

    return({
        currentUser: state.entities.users[state.session.userId],
        chart: state.entities.assets,
    });
};

const mdp = dispatch => {
    return({
        logout: () => dispatch(logout()),
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range))
    });
};

export default connect(msp, mdp)(Greeting);