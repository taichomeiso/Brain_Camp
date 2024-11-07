document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById(
    "color_rock_paper_gameStartButton_id"
  );
  const tutorialScreen = document.querySelector(
    ".color_rock_paper_sicissors-tutorial-movie-screen"
  );
  const tutorialDescriptionScreen = document.querySelector(
    ".color_rock_paper_sicissors-tutorial-description-wrapper"
  );
  const tutorialMovie = document.querySelector(
    ".color_rock_paper_sicissors-tutorial-movie"
  );
  const playTutorialButton = document.querySelector(
    ".color_rock_paper_sicissors_play-tutorial-image"
  );
  if (!gameStartButton) {
    return null;
  }
  playTutorialButton.addEventListener("click", () => {
    tutorialDescriptionScreen.style.display = "none";
    tutorialMovie.style.display = "flex";
    // volumeBoxes.forEach((volumeBox) => {
      // volumeBox.style.display = "none";
    // });
    tutorialMovie.play();
  });

  gameStartButton.addEventListener("click", () => {
    tutorialScreen.style.display = "none";
  });
});
