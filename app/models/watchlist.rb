# == Schema Information
#
# Table name: watchlists
#
#  id           :bigint(8)        not null, primary key
#  user_id      :integer          not null
#  asset_symbol :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Watchlist < ApplicationRecord 
    validates :user_id, :asset_symbol, presence: true

    belongs_to :user
end
