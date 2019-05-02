
import * as ApiUtilWatchlist from '../util/watchlist_util';
export const RECEIVE_WATCHLISTS = "RECEIVE_WATCHLISTS";
export const REMOVE_WATCHLIST = "REMOVE_WATCHLIST";
export const RECEIVE_WATCHONE = "RECEIVE_WATCHONE";


export const receiveWatchLists = (watchlists) => {
    return({
        type: RECEIVE_WATCHLISTS,
        watchlists
    });
};

export const receiveWatchone = (watchone) => {
    return({
        type: RECEIVE_WATCHONE,
        watchone,
    });
};

export const removeWatchlist = (id) => {
    return({
        type: REMOVE_WATCHLIST,
        id,
    });
};

export const fetWatchlists = (id) => dispatch => {
    return (
        ApiUtilWatchlist.getWatchlists(id)
            .then(watchlist => dispatch(receiveWatchLists(watchlist)))
    );
};

export const createWatchlist = (watchlist) => dispatch => {
    return(
        ApiUtilWatchlist.createWatchlist(watchlist)
            .then(watchlist => dispatch(receiveWatchone(watchlist)))
    );
};

export const destroyWatchlist = (watchlist) => dispatch => {
    return(
        ApiUtilWatchlist.destroyWatchlist(watchlist)
            .then(() => dispatch(removeWatchlist(watchlist.id)))
    );
};