# == Schema Information
#
# Table name: transactions
#
#  id           :bigint(8)        not null, primary key
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  quantity     :integer          not null
#  asset_symbol :string           not null
#  price        :float            not null
#

class Transaction < ApplicationRecord
    validates :user_id, :asset_symbol, :price, presence: true
    
    belongs_to :user

    # belongs_to :asset,
    #     primary_key: :symbol,
    #     foreign_key: :asset_symbol,
    #     class_name: "Asset"

end
