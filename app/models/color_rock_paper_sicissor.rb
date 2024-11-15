class ColorRockPaperSicissor < ApplicationRecord
  validates :nickname, presence: true, uniqueness: { message: 'は既に使用されています。' }
  validates :score, presence: true
  def self.latest_record
    order(created_at: :desc).limit(1).pluck(:id).first
  end
end
