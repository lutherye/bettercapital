import { connect } from 'react-redux';
import { fetChart, fetQuote, fetAllNews } from '../../actions/asset_actions';
import {logout} from '../../actions/session_actions';
import { updateUserInfo, updateTransaction, fetTransaction } from '../../actions/transaction_actions';
import Greeting from './greeting';
import { withRouter } from 'react-router-dom';
import { fetWatchlists } from '../../actions/watchlist_actions';

const msp = (state) => {

    return({
        currentUser: state.entities.users[state.session.userId],
        chart: state.entities.assets,
        transactions: state.entities.transactions,
        watchlists: state.entities.watchlists,
    });
};

const mdp = dispatch => {
    return({
        logout: () => dispatch(logout()),
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: (symbol) => dispatch(fetQuote(symbol)),
        updateUserInfo: (user) => dispatch(updateUserInfo(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        fetTransaction: (id) => dispatch(fetTransaction(id)),
        fetAllNews: (news) => dispatch(fetAllNews(news)),
        fetBatch: (symbols, range) => dispatch(fetBatch(symbols, range)),
        fetWatchlists: (id) => dispatch(fetWatchlists(id)),
    });
};

export default withRouter(connect(msp, mdp)(Greeting));