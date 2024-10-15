require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get color_rock_paper_sicissors" do
    get games_color_rock_paper_sicissors_url
    assert_response :success
  end

  test "should get memory_square" do
    get games_memory_square_url
    assert_response :success
  end

  test "should get number_master" do
    get games_number_master_url
    assert_response :success
  end

  test "should get reverse_colors" do
    get games_reverse_colors_url
    assert_response :success
  end

  test "should get fit_the_shape" do
    get games_fit_the_shape_url
    assert_response :success
  end
end
