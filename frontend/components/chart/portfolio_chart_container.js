import { connect } from 'react-redux';
import { fetChart, fetBatch, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import PortfolioChart from './portfolio_chart';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { updateUser, updateTransaction } from '../../actions/transaction_actions';

const msp = (state, ownProps) => {
    let symbols = [];
    if (ownProps.sidebar !== undefined) {
        Object.keys(ownProps.sidebar).forEach(ele => {
            symbols.push(ele.toUpperCase());
        });
    }

    const chart = state.entities.assets.charts;
    return ({
        currentUser: state.entities.users[state.session.userId],
        chart,
        transactions: state.entities.transactions,
        symbols,
    });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        // asset
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetBatch: (symbols, range) => dispatch(fetBatch(symbols, range)),
        fetQuote: symbol => dispatch(fetQuote(symbol)),
        fetSymbol: () => dispatch(fetSymbol()),
        fetNews: (symbol) => dispatch(fetNews(symbol)),
        fetCompany: (symbol) => dispatch(fetCompany(symbol)),
        // transaction
        updateUser: (user) => dispatch(updateUser(user)),
        updateTransaction: (transaction) => dispatch(updateTransaction(transaction)),

    });
};


export default connect(msp, mdp)(PortfolioChart);