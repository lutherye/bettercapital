class Asset < ApplicationRecord 
    validates :symbol, presence: true, uniqueness: true
    
end