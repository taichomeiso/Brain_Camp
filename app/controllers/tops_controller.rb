class TopsController < ApplicationController
  before_action :set_ranking_data, only: %i[index rankings]

  def set_ranking_data
    @memory_squares = MemorySquare.order(score: :desc).limit(20)
    @color_rock_paper_sicissors = ColorRockPaperSicissor.order(score: :desc).limit(20)
    @number_masters = NumberMaster.order(game_time: :asc).limit(20)

    # 最新のレコードIDを取得
    @latest_memory_square_id = MemorySquare.latest_record
    @latest_color_rock_paper_sicissor_id = ColorRockPaperSicissor.latest_record
    @latest_number_master_id = NumberMaster.latest_record
  end

  def rankings
    data = case params[:game]
           when 'color_rock_paper_sicissors'
             @color_rock_paper_sicissors.map do |record|
               record.as_json(only: %i[id score]).merge(
                 nickname: truncate_nickname(record.nickname)
               )
             end
           when 'memory_square'
             @memory_squares.map do |record|
               record.as_json(only: %i[id score]).merge(
                 nickname: truncate_nickname(record.nickname)
               )
             end
           when 'number_master'
             @number_masters.map do |record|
               record.as_json(only: %i[id game_time]).merge(
                 nickname: truncate_nickname(record.nickname)
               )
             end
           else
             []
           end
    render json: data
  end

  private

  def truncate_nickname(text)
    return text.to_s if text.to_s.length <= 10

    "#{text.to_s[0...10]}..."
  end
end
