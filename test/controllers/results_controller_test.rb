require "test_helper"

class ResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get indez" do
    get results_indez_url
    assert_response :success
  end
end
