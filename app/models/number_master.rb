class NumberMaster < ApplicationRecord
  validates :nickname, presence: true, uniqueness: { message: "は既に使用されています。" }
  validates :game_time, presence: true
  def self.latest_record
    order(created_at: :desc).limit(1).pluck(:id).first
  end
end
