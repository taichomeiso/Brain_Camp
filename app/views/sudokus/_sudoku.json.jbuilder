json.extract! sudoku, :id, :board, :initial_board, :solved, :created_at, :updated_at
json.url sudoku_url(sudoku, format: :json)
