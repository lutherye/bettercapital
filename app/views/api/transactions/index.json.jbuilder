@transactions.each do |transaction|
    json.set! transaction.id do
        json.extract! transaction, :id, :quantity, :price, :user_id, :asset_symbol, :created_at
    end
end