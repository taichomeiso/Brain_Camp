class CreateMemorySquares < ActiveRecord::Migration[7.0]
  def change
    create_table :memory_squares do |t|
      t.string :nickname
      t.integer :score

      t.timestamps
    end
  end
end
