Rails.application.routes.draw do
  # root to: 'tops#index'
  get 'games/color_rock_paper_sicissors'
  root to: 'games#memory_square'
  get 'games/number_master'
  get 'games/reverse_colors'
  get 'games/fit_the_shape'
  get 'results/index'
end
