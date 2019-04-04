# == Schema Information
#
# Table name: assets
#
#  id         :bigint(8)        not null, primary key
#  symbol     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Asset < ApplicationRecord 
    # validates :symbol, presence: true, uniqueness: true
    
    # has_many :transactions
    
    # has_many :users,
    #     through: :transactions,
    #     source: :user

        # def self.symbols_hash
        #     hash = Hash.new
        #     Asset.all.each do |ele|
        #         hash[ele.id] = ele.symbol
        #     end
        #     return hash
        # end
end
