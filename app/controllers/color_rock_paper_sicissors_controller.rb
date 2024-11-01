class ColorRockPaperSicissorsController < ApplicationController
  def index

  end

  def new
    @color_rock_paper_sicissor = ColorRockPaperSicissor.new
  end

  def create
    @color_rock_paper_sicissor = ColorRockPaperSicissor.new(create_params)
    if @color_rock_paper_sicissor.save
      render json: { message: 'スコアが保存されました' }, status: :created
    else
      render json: { errors: score.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  def create_params
    params.require(:color_rock_paper_sicissor).permit(:name, :score)
  end
end
