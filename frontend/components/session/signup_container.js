import { connect } from 'react-redux';
import { createUser } from '../../actions/session_actions';
import Signup from './signup';

const mdp = dispatch => {
    return({
        createUser: (formUser) => dispatch(createUser(formUser)),
    });
};

export default connect(null, mdp)(Signup);