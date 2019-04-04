import { connect } from 'react-redux';
import { fetChart, fetQuote } from '../../actions/asset_actions';
import {logout} from '../../actions/session_actions';
import { updateUser, updateTransaction, fetTransaction } from '../../actions/transaction_actions';
import Greeting from './greeting';

const msp = (state) => {

    return({
        currentUser: state.entities.users[state.session.userId],
        chart: state.entities.assets,
        transactions: state.entities.transactions,
    });
};

const mdp = dispatch => {
    return({
        logout: () => dispatch(logout()),
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: (symbol) => dispatch(fetQuote(symbol)),
        updateUser: (user) => dispatch(updateUser(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        fetTransaction: (id) => dispatch(fetTransaction(id)),
    });
};

export default connect(msp, mdp)(Greeting);