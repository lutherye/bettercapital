class Api::AssetsController < ApplicationController

    def index
        @assets = Asset.all
    end

    def show
        @asset = Asset.find_by(params[:symbol])
        if @asset
            render "/api/assets/show"
        else
            render json: ["Unable to find any result for your search"]
        end
    end
end