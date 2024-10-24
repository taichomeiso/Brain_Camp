class CreateSudokus < ActiveRecord::Migration[7.0]
  def change
    create_table :sudokus do |t|
      t.text :board
      t.text :initial_board
      t.boolean :solved

      t.timestamps
    end
  end
end
