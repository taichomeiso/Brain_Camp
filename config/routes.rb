Rails.application.routes.draw do
  root to: 'tops#index'
  get 'games/color_rock_paper_sicissors'
  get 'games/memory_square'
  get 'games/number_master'
  get 'games/reverse_colors'
  get 'games/fit_the_shape'
  get 'results/color_rock_paper_sicissors'
  get 'results/memory_square'
  get 'results/number_master'
end
