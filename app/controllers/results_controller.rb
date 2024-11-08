class ResultsController < ApplicationController
  def color_rock_paper_sicissors
    @color_rock_paper_sicissors = ColorRockPaperSicissor.new # ここでインスタンスを初期化

    return unless request.post?

    @color_rock_paper_sicissors.assign_attributes(color_rock_paper_sicissors_square_params) 
    if @color_rock_paper_sicissors.save
      redirect_to root_path, notice: '記録が登録されました！'
    else
      render :color_rock_paper_sicissors
    end
  end

  def memory_square
    @memory_square = MemorySquare.new # ここでインスタンスを初期化

    return unless request.post?

    @memory_square.assign_attributes(memory_square_params)
    if @memory_square.save
      redirect_to root_path, notice: '記録が登録されました！'
    else
      render :memory_square
    end
  end

  def number_master
    @game_time = params[:game_time] 
    @number_master = NumberMaster.new 
  end

  
  def create_number_master
    game_time_str = params[:number_master][:game_time] 
    time_parts = game_time_str.split(':')
    minutes = time_parts[0].to_i
    seconds_and_milliseconds = time_parts[1].to_f

    seconds = seconds_and_milliseconds.to_i
    milliseconds = ((seconds_and_milliseconds - seconds) * 1000).round

    total_game_time = (minutes * 60) + seconds + (milliseconds / 1000.0)

    @number_master = NumberMaster.new(number_master_params.except(:game_time).merge(game_time: total_game_time))

    Rails.logger.debug "Nickname: #{@number_master.nickname}, Game Time: #{@number_master.game_time}"

    if @number_master.save
      redirect_to root_path, notice: '記録が登録されました！'
    else
      Rails.logger.debug "Errors: #{@number_master.errors.full_messages}"
      render :number_master, alert: '記録の登録に失敗しました。'
    end
  end

  def memory_square_params
    params.require(:memory_square).permit(:nickname, :score)
  end
  def format_time(seconds)
    minutes = seconds.to_i / 60
    remaining_seconds = (seconds % 60).round(3)  # 小数点以下3桁まで表示
    format("%d:%05.3f", minutes, remaining_seconds)  # 小数点以下3桁で表示
  end

  def color_rock_paper_sicissors_square_params
    params.require(:color_rock_paper_sicissor).permit(:nickname, :score)
  end

  private

  def number_master_params
    params.require(:number_master).permit(:nickname, :game_time)
  end

  def show
    # 必要に応じてレコードのIDで取得
    @result = Result.find(params[:id])
  end
end
