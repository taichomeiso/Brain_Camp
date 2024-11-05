class TopsController < ApplicationController
  def index
    # @memory_squares = MemorySquare.order(score: :desc).limit(10)
    # @color_rock_paper_sicissor = ColorRockPaperSicissor.order(score: :desc).limit(10)
    # 仮のランキングデータを定義
    @memory_squares = [
      OpenStruct.new(nickname: 'Player1', score: 120),
      OpenStruct.new(nickname: 'Player2', score: 110),
      OpenStruct.new(nickname: 'Player3', score: 100),
      OpenStruct.new(nickname: 'Player4', score: 90),
      OpenStruct.new(nickname: 'Player5', score: 80),
      OpenStruct.new(nickname: 'Player6', score: 70),
      OpenStruct.new(nickname: 'Player7', score: 60),
      OpenStruct.new(nickname: 'Player8', score: 50),
      OpenStruct.new(nickname: 'Player9', score: 40),
      OpenStruct.new(nickname: 'Player10', score: 30)
    ]

    @color_rock_paper_sicissor = [
      OpenStruct.new(nickname: 'PlayerA', score: 95),
      OpenStruct.new(nickname: 'PlayerB', score: 85),
      OpenStruct.new(nickname: 'PlayerC', score: 75),
      OpenStruct.new(nickname: 'PlayerD', score: 65),
      OpenStruct.new(nickname: 'PlayerE', score: 55),
      OpenStruct.new(nickname: 'PlayerF', score: 45),
      OpenStruct.new(nickname: 'PlayerG', score: 35),
      OpenStruct.new(nickname: 'PlayerH', score: 25),
      OpenStruct.new(nickname: 'PlayerI', score: 15),
      OpenStruct.new(nickname: 'PlayerJ', score: 5)
    ]

    @number_master = [
      OpenStruct.new(nickname: 'PlayerA', score: 95),
      OpenStruct.new(nickname: 'PlayerB', score: 85),
      OpenStruct.new(nickname: 'PlayerC', score: 75),
      OpenStruct.new(nickname: 'PlayerD', score: 65),
      OpenStruct.new(nickname: 'PlayerE', score: 55),
      OpenStruct.new(nickname: 'PlayerF', score: 45),
      OpenStruct.new(nickname: 'PlayerG', score: 35),
      OpenStruct.new(nickname: 'PlayerH', score: 25),
      OpenStruct.new(nickname: 'PlayerI', score: 15),
      OpenStruct.new(nickname: 'PlayerJ', score: 5)
    ]
  end
end
