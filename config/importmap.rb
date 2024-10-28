# Pin npm packages by running ./bin/importmap

pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js'
pin '@hotwired/stimulus', to: 'stimulus.min.js'
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin 'game-memory-square', to: 'game-memory-square.js'
pin 'tutorial-memory-square', to: 'tutorial-memory-square.js'
pin 'result-display-memory-square', to: 'result-display-memory-square.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'