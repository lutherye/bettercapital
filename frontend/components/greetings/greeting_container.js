import { connect } from 'react-redux';

import {logout} from '../../actions/session_actions';
import Greeting from './greeting';

const msp = (state) => {

    return({
        currentUser: state.entities.users[state.session.userId],
        chart: state.chart,
    });
};

const mdp = dispatch => {
    return({
        logout: () => dispatch(logout())
    });
};

export default connect(msp, mdp)(Greeting);