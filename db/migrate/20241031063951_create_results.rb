class CreateResults < ActiveRecord::Migration[7.0]
  def change
    create_table :results do |t|
      t.string :nickname
      t.float :game_time

      t.timestamps
    end
  end
end
