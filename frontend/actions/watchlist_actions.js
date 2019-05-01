
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
            .then(watchlist => dispatch(receiveWatchlists(watchlist)))
    );
};

export const createWatchlist = watchlist => dispatch => {
    return(
        ApiUtilWatchlist.createWatchlist(watchlist)
    );
};

export const destroyWatchlist = watchlist => dispatch => {
    return(
        ApiUtilWatchlist.destroyWatchlist(watchlist)
    );
};