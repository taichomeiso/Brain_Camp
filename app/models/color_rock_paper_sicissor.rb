class ColorRockPaperSicissor < ApplicationRecord
  validates :name,          presence: true
  validates :score,         numericality: {
    only_integer: true, greater_than_or_equal_to: 0
  }
end
