class ChangeToSymbol < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :asset_id
    add_column :transactions, :asset_symbol, :string, null: false
  end
end
