import { connect } from 'react-redux';
import { fetChart, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import Chart from './chart';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { updateUser, updateTransaction } from '../../actions/transaction_actions';

const msp = (state, ownProps) => {

    const chart = state.entities.assets;
    // const id = ownProps.match.params.symbol;
    return ({
        currentUser: state.entities.users[state.session.userId],
        chart,
        // symbol: Object.keys(chart)[0],
        // id,
        // transactions: state.entities.transactions,
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
        updateUser: (user) => dispatch(updateUser(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),

    });
};


export default connect(msp, mdp)(Chart);