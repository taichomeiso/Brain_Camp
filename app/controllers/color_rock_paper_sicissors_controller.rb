class ColorRockPaperSicissorsController < ApplicationController
  def index
  end

  def new
    @color_rock_paper_sicissor = ColorRockPaperSicissor.new
  end

  def create
    @color_rock_paper_sicissor = ColorRockPaperSicissor.new(create_params)
    if @color_rock_paper_sicissor.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def create_params
    params.require(:color_rock_paper_sicissor).permit(:nickname, :score)
  end
end
