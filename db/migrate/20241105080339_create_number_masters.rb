class CreateNumberMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :number_masters do |t|
      t.string :nickname
      t.string :game_time

      t.timestamps
    end
  end
end
