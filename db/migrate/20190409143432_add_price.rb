class AddPrice < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :price, :float, null: false
  end
end
