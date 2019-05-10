
export const getWatchlists = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}/watchlists`,
    });
};

export const createWatchlist = (watchlist) => {
    return $.ajax({
        method: "POST",
        url: `/api/users/${watchlist.user_id}/watchlists`,
        data: {watchlist}
    });
};

export const destroyWatchlist = (watchlist) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/users/${watchlist.user_id}/watchlists/${watchlist.id}`,
        data: {id: watchlist.id}
    });
};
