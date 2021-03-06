import { connect } from 'react-redux';
import { fetChart, fetBatch, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import Chart from './chart';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { updateUserInfo, updateTransaction } from '../../actions/transaction_actions';

const msp = (state, ownProps) => {
    const chart = state.entities.assets;
    const id = ownProps.match.params.symbol.toUpperCase();
    return ({
        currentUser: state.entities.users[state.session.userId],
        chart,
        id,
        // symbol: Object.keys(chart)[0],
        // transactions: state.entities.transactions,
    });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        // asset
        fetBatch: (symbol, range) => dispatch(fetBatch(symbol, range)),
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetQuote: symbol => dispatch(fetQuote(symbol)),
        fetSymbol: () => dispatch(fetSymbol()),
        fetNews: (symbol) => dispatch(fetNews(symbol)),
        fetCompany: (symbol) => dispatch(fetCompany(symbol)),
        // transaction
        updateUserInfo: (user) => dispatch(updateUserInfo(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),

    });
};


export default withRouter(connect(msp, mdp)(Chart));