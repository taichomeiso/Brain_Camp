# app/controllers/tops_controller.rb
class TopsController < ApplicationController
  before_action :set_ranking_data, only: %i[index rankings]

  def set_ranking_data
    @memory_squares = MemorySquare.order(score: :desc).limit(20).map do |record|
      record.as_json(only: %i[id nickname score]).tap do |record_json|
        record_json['nickname'] = truncate_nickname(record_json['nickname'])
      end
    end

    @color_rock_paper_sicissors = ColorRockPaperSicissor.order(score: :desc).limit(20).map do |record|
      record.as_json(only: %i[id nickname score]).tap do |record_json|
        record_json['nickname'] = truncate_nickname(record_json['nickname'])
      end
    end

    @number_masters = NumberMaster.order(game_time: :asc).limit(20).map do |record|
      record.as_json(only: %i[id nickname game_time]).tap do |record_json|
        record_json['nickname'] = truncate_nickname(record_json['nickname'])
      end
    end

    # 最新のレコードIDを取得
    @latest_ids = {
      memory_square: MemorySquare.latest_record,
      color_rock_paper_sicissors: ColorRockPaperSicissor.latest_record,
      number_master: NumberMaster.latest_record
    }
  end

  def rankings
    game_type = params[:game]
    data = case game_type
           when 'color_rock_paper_sicissors'
             @color_rock_paper_sicissors
           when 'memory_square'
             @memory_squares
           when 'number_master'
             @number_masters
           else
             []
           end

    render json: {
      rankings: data,
      latest_id: @latest_ids[game_type.to_sym]
    }
  end

  private

  def truncate_nickname(text)
    return text.to_s if text.to_s.length <= 10

    "#{text.to_s[0...10]}..."
  end
end
