class MemorySquare < ApplicationRecord
  validates :nickname, presence: true
  validates :score, presence: true
end
