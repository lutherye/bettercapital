import { connect } from 'react-redux';
import { fetChart, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import Asset from './assets';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { updateUserInfo, updateTransaction, fetTransaction, destroyTransaction } from '../../actions/transaction_actions';
import { fetWatchlists, createWatchlist, destroyWatchlist } from '../../actions/watchlist_actions';

const msp = (state, ownProps) => {

    const chart = state.entities.assets;
    const entities = state.entities;
    const id = ownProps.match.params.symbol;
    const watchlists = state.entities.watchlists;
    const transactions = state.entities.transactions;
    return({
        entities,
        watchlists,
        currentUser: state.entities.users[state.session.userId],
        chart,
        symbol: Object.keys(chart)[0],
        id,
        transactions,
    });
};

const mdp = dispatch => {
    return ({
        // user
        logout: () => dispatch(logout()),
        // asset
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: symbol => dispatch(fetQuote(symbol)),
        fetSymbol: () => dispatch(fetSymbol()),
        fetNews: (symbol) => dispatch(fetNews(symbol)),
        fetCompany: (symbol) => dispatch(fetCompany(symbol)),
        // transaction
        updateUserInfo: (id, buyingPower) => dispatch(updateUserInfo(id, buyingPower)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        fetTransaction: (id) => dispatch(fetTransaction(id)),
        destroyTransaction: (transaction) => dispatch(destroyTransaction(transaction)),
        // watchlist
        fetWatchlists: (id) => dispatch(fetWatchlists(id)),
        createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist)),
        destroyWatchlist: (watchlist) => dispatch(destroyWatchlist(watchlist)),
    });
};


export default withRouter(connect(msp,mdp)(Asset));