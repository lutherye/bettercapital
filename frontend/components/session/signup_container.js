import { connect } from 'react-redux';
import { createUser } from '../../actions/session_actions';
import Signup from './signup';

const msp = state => {
    return({
        errors: state.errors.sessionError,
    });
};

const mdp = dispatch => {
    return({
        createUser: (formUser) => dispatch(createUser(formUser)),
    });
};

export default connect(msp, mdp)(Signup);