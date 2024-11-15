# Pin npm packages by running ./bin/importmap
pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js'
pin '@hotwired/stimulus', to: 'stimulus.min.js'
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin 'top-page', to: 'top-page.js'
pin 'number_master', to: 'number_master.js'
pin 'game-memory-square', to: 'game-memory-square.js'
pin 'tutorial-memory-square', to: 'tutorial-memory-square.js'
pin 'tutorial-number_master', to: 'tutorial-number_master.js'
pin 'result-display-number-master', to: 'result-display-number-master.js'
pin 'result-display-memory-square', to: 'result-display-memory-square.js'
pin 'tutorial-color_rock_paper_sicissors', to: 'tutorial-color_rock_paper_sicissors.js'
pin 'result-display-color_rock_paper_sicissors', to: 'result-display-color_rock_paper_sicissors.js'
pin "color_rock_paper_sicissors", to: "color_rock_paper_sicissors.js"

