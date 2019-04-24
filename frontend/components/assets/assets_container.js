import { connect } from 'react-redux';
import { fetChart, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import Asset from './assets';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { updateUserInfo, updateTransaction, fetTransaction } from '../../actions/transaction_actions';

const msp = (state, ownProps) => {

    const chart = state.entities.assets;
    const entities = state.entities;
    const id = ownProps.match.params.symbol;
    return({
        entities,
        currentUser: state.entities.users[state.session.userId],
        chart,
        symbol: Object.keys(chart)[0],
        id,
    });
};

const mdp = dispatch => {
    return ({
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

    });
};


export default withRouter(connect(msp,mdp)(Asset));