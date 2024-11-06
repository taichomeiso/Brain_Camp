class CreateColorRockPaperSicissors < ActiveRecord::Migration[7.0]
  def change
    create_table :color_rock_paper_sicissors do |t|
      t.string :nickname
      t.integer :score
      t.timestamps
    end
  end
end
