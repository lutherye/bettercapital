
export const getWatchlists = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}/watchlists`,
    });
};

export const createWatchlist = (user_id, asset_symbol) => {
    return $.ajax({
        method: "POST",
        url: `/api/users/${watchlist.user_id}/watchlists`,
        data: {user_id, asset_symbol}
    });
};

export const destroyWatchlist = (watchlist) => {
    let id = watchlist.id;
    return $.ajax({
        method: "DELETE",
        url: `/api/users/${watchlist.user_id}/watchlists/${watchlist.id}`,
        data: {id}
    });
};
