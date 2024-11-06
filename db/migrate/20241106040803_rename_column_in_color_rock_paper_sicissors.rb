class UpdateColorRockPaperSicissorsTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :color_rock_paper_sicissors, :name, :nickname
  end
end
