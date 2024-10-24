require "application_system_test_case"

class SudokusTest < ApplicationSystemTestCase
  setup do
    @sudoku = sudokus(:one)
  end

  test "visiting the index" do
    visit sudokus_url
    assert_selector "h1", text: "Sudokus"
  end

  test "should create sudoku" do
    visit sudokus_url
    click_on "New sudoku"

    fill_in "Board", with: @sudoku.board
    fill_in "Initial board", with: @sudoku.initial_board
    check "Solved" if @sudoku.solved
    click_on "Create Sudoku"

    assert_text "Sudoku was successfully created"
    click_on "Back"
  end

  test "should update Sudoku" do
    visit sudoku_url(@sudoku)
    click_on "Edit this sudoku", match: :first

    fill_in "Board", with: @sudoku.board
    fill_in "Initial board", with: @sudoku.initial_board
    check "Solved" if @sudoku.solved
    click_on "Update Sudoku"

    assert_text "Sudoku was successfully updated"
    click_on "Back"
  end

  test "should destroy Sudoku" do
    visit sudoku_url(@sudoku)
    click_on "Destroy this sudoku", match: :first

    assert_text "Sudoku was successfully destroyed"
  end
end
