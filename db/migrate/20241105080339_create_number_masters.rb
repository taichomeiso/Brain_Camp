class CreateNumberMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :number_masters do |t|
      t.string :nickname
      t.decimal :game_time, precision: 6, scale: 3

      t.timestamps
    end
  end
end
