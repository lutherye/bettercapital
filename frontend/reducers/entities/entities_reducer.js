import { combineReducers } from 'redux';
import assetsReducer from './assets_reducer';
import usersReducer from './users_reducer';
import transactionReducer from './transactions_reducer';
import watchlistReducer from './watchlist_reducer';


export default combineReducers({
    users: usersReducer,
    assets: assetsReducer,
    transactions: transactionReducer,
    watchlists: watchlistReducer,
});