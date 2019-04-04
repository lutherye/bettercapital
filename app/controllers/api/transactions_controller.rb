class Api::TransactionsController < ApplicationController

    def index
        @transactions = User.find(params[:user_id]).transactions
    end

    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id
        if @transaction.save!
            # render "/api/transactions/index"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    private

    def transaction_params
        params.require(:transaction).permit(:user_id, :asset_symbol, :quantity)
    end
end