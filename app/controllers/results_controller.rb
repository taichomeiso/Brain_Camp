class ResultsController < ApplicationController
  def color_rock_paper_sicissors
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
    if params[:number_master].nil?
      Rails.logger.debug "number_master param is missing"
      render :number_master, alert: 'number_master param is missing'
      return
    end
    @number_master = NumberMaster.new(number_master_params)
    if @number_master.save
      redirect_to root_path, notice: '記録が登録されました！'
    else
      Rails.logger.debug "Errors: #{@number_master.errors.full_messages}"
      render :number_master, alert: '記録の登録に失敗しました。'
    end
  end

  private

  def number_master_params
    params.require(:number_master).permit(:nickname, :game_time)
  end


  def memory_square_params
    params.require(:memory_square).permit(:nickname, :score)
  end
end
