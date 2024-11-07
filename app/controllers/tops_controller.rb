class TopsController < ApplicationController
  def index
    @memory_squares = MemorySquare.order(score: :desc).limit(5)
  end
end
