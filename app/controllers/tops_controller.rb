class TopsController < ApplicationController
  before_action :set_ranking_data, only: %i[index rankings]

  def set_ranking_data
    @memory_squares = MemorySquare.order(score: :desc).limit(20)
    @color_rock_paper_sicissors = ColorRockPaperSicissor.order(score: :desc).limit(20)
    @number_masters = NumberMaster.order(game_time: :asc).limit(20)
  end

  def rankings
    data = case params[:game]
           when 'color_rock_paper_sicissors'
             @color_rock_paper_sicissors.map(&:as_json)
           when 'memory_square'
             @memory_squares.map(&:as_json)
           when 'number_master'
             @number_masters.map(&:as_json)
           else
             []
           end
    render json: data
  end
end
