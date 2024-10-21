Rails.application.routes.draw do
  # root to: 'tops#index'
  root to: 'games#color_rock_paper_sicissors' #＜ーー　すぐにゲーム画面を確認するために書いてます
  get 'games/color_rock_paper_sicissors'
  get 'games/memory_square'
  get 'games/number_master'
  get 'games/reverse_colors'
  get 'games/fit_the_shape'
  get 'results/index'
end
