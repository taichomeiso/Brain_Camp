require "test_helper"

class SudokusControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sudoku = sudokus(:one)
  end

  test "should get index" do
    get sudokus_url
    assert_response :success
  end

  test "should get new" do
    get new_sudoku_url
    assert_response :success
  end

  test "should create sudoku" do
    assert_difference("Sudoku.count") do
      post sudokus_url, params: { sudoku: { board: @sudoku.board, initial_board: @sudoku.initial_board, solved: @sudoku.solved } }
    end

    assert_redirected_to sudoku_url(Sudoku.last)
  end

  test "should show sudoku" do
    get sudoku_url(@sudoku)
    assert_response :success
  end

  test "should get edit" do
    get edit_sudoku_url(@sudoku)
    assert_response :success
  end

  test "should update sudoku" do
    patch sudoku_url(@sudoku), params: { sudoku: { board: @sudoku.board, initial_board: @sudoku.initial_board, solved: @sudoku.solved } }
    assert_redirected_to sudoku_url(@sudoku)
  end

  test "should destroy sudoku" do
    assert_difference("Sudoku.count", -1) do
      delete sudoku_url(@sudoku)
    end

    assert_redirected_to sudokus_url
  end
end
