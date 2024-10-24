class SudokusController < ApplicationController
  before_action :set_sudoku, only: %i[ show edit update destroy ]

  # GET /sudokus or /sudokus.json
  def index
    @sudokus = Sudoku.all
  end

  # GET /sudokus/1 or /sudokus/1.json
  def show
  end

  # GET /sudokus/new
  def new
    @sudoku = Sudoku.new
  end

  # GET /sudokus/1/edit
  def edit
  end

  # POST /sudokus or /sudokus.json
  def create
    @sudoku = Sudoku.new(sudoku_params)

    respond_to do |format|
      if @sudoku.save
        format.html { redirect_to @sudoku, notice: "Sudoku was successfully created." }
        format.json { render :show, status: :created, location: @sudoku }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @sudoku.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sudokus/1 or /sudokus/1.json
  def update
    respond_to do |format|
      if @sudoku.update(sudoku_params)
        format.html { redirect_to @sudoku, notice: "Sudoku was successfully updated." }
        format.json { render :show, status: :ok, location: @sudoku }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @sudoku.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sudokus/1 or /sudokus/1.json
  def destroy
    @sudoku.destroy

    respond_to do |format|
      format.html { redirect_to sudokus_path, status: :see_other, notice: "Sudoku was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sudoku
      @sudoku = Sudoku.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sudoku_params
      params.require(:sudoku).permit(:board, :initial_board, :solved)
    end
end
