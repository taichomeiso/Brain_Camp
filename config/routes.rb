Rails.application.routes.draw do

  resources :sudokus
  # root to: 'tops#index'

  resources :color_rock_paper_sicissors, only:[:index,:new ,:create]
  root to: 'tops#index'

  # ゲームに関するルーティング
  get 'games/color_rock_paper_sicissors'
  get 'games/memory_square'
  get 'games/number_master'
  get 'games/reverse_colors'
  get 'games/fit_the_shape'

  # 結果に関するルーティング
  get 'results/color_rock_paper_sicissors'
  get 'results/memory_square', to: 'results#memory_square'
  get 'results/number_master'

  # 結果登録に関する POST ルーティング
  post 'results/memory_square', to: 'results#memory_square'
end
