@transactions.each do |transaction|
    json.set! transaction.id do
        json.extract! transaction, :id, :quantity, :user_id, :asset_symbol
    end
end