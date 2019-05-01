@watchlists.each do |watchlist|
    json.set! watchlist.id do
        json.extract! watchlist, :id, :user_id, :asset_symbol, :created_at
    end
end