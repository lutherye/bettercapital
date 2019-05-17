import { connect } from 'react-redux';
import { updateUserInfo, updateTransaction, fetTransaction } from '../../actions/transaction_actions';
import Sidebar from './sidebar';
import { withRouter } from 'react-router-dom';
import { fetWatchlists } from '../../actions/watchlist_actions';
import { fetQuote, fetPrice } from '../../actions/asset_actions';

const msp = state => {
    return({
        currentUser: state.entities.users[state.session.userId],
        chart: state.entities.assets,
        transactions: state.entities.transactions,
        watchlists: state.entities.watchlists,
    });
};

const mdp = dispatch => {
    return({
        fetQuote: (symbol) => dispatch(fetQuote(symbol)),
        updateUserInfo: (user) => dispatch(updateUserInfo(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        fetTransaction: (id) => dispatch(fetTransaction(id)),
        fetWatchlists: (id) => dispatch(fetWatchlists(id)),
        fetPrice: (symbol) => dispatch(fetPrice(symbol)),
    });
};

export default withRouter(connect(msp, mdp)(Sidebar));