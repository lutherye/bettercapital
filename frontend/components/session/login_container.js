import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Login from './login';

const msp = state => {
    return ({
        errors: state.errors.sessionError,
    });
};

const mdp = dispatch => {
    return({
        login: (formUser) => dispatch(login(formUser))
    });
};

export default connect(msp, mdp)(Login);