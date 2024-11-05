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
  end

  private

  def memory_square_params
    params.require(:memory_square).permit(:nickname, :score)
  end

  def color_rock_paper_sicissors_square_params
    params.require(:color_rock_paper_sicissor).permit(:nickname, :score)
  end

  def show
    # 必要に応じてレコードのIDで取得
    @result = Result.find(params[:id])
  end
end
