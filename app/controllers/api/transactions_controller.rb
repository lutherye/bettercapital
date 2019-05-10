class Api::TransactionsController < ApplicationController

    def index
        @transactions = User.find(params[:user_id]).transactions
    end

    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id
        if @transaction.save!
            render :show
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def destroy
        @transaction = Transaction.find(params[:id])
        @transaction.destroy
    end

    private

    def transaction_params
        params.require(:transaction).permit(:user_id, :asset_symbol, :quantity, :price)
    end
end