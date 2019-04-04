class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|

      t.integer :user_id, null: false, index: true
      t.integer :asset_id, null: false, index: true

      t.timestamps
    end
  end
end
