class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :user_id, null: false, index: true
      t.string :asset_symbol, null: false, index: true
      t.timestamps
    end
  end
end
