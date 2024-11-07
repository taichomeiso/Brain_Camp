class CreateColorRockPaperSicissors < ActiveRecord::Migration[7.0]
  def change
    create_table :color_rock_paper_sicissors do |t|
      t.string     :name
      t.integer    :score, null: false, default: 0
      t.timestamps
    end
  end
end
