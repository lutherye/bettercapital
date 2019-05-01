class Api::WatchlistsController < ApplicationController

    def index
        @watchlists = User.find(params[:user_id]).watchlists
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        @watchlist.user_id = current_user.id
        if @watchlist.save

        else
            render json: @watchlist.errors.full_messages, status: 422
        end
    end

    def destroy
        # @watchlist = Watchlist.find_by(user_id: params[:user_id], asset_symbol: params[:asset_symbol])
        @watchlist = Watchlist.find(params[:id])
        @watchlist.delete

    end

    private

    def watchlist_params
        params.require(:watchlist).permit(:user_id, :asset_symbol)
    end
end