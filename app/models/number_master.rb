class NumberMaster < ApplicationRecord
  validates :nickname, presence: true
  validates :game_time, presence: true
end
