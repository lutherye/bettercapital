
import * as ApiUtilWatchlist from '../util/watchlist_util';
export const RECEIVE_WATCHLISTS = "RECEIVE_WATCHLISTS";


export const receiveWatchLists = (watchlists) => {
    return({
        type: RECEIVE_WATCHLISTS,
        watchlists
    });
};

export const fetWatchlists = (id) => dispatch => {
    return (
        ApiUtilWatchlist.getWatchlists(id)
            .then(watchlist => dispatch(receiveWatchLists(watchlist)))
    );
};

export const createWatchlist = (user_id, asset_symbol) => dispatch => {
    return(
        ApiUtilWatchlist.createWatchlist(user_id, asset_symbol)
    );
};

export const destroyWatchlist = (watchlist) => dispatch => {
    return(
        ApiUtilWatchlist.destroyWatchlist(watchlist)
    );
};