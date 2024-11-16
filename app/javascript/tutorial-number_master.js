document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById(
    "startButton"
  );
  const tutorialScreen = document.querySelector(
    ".number_master__tutorial-movie-screen"
  );
  const tutorialDescriptionScreen = document.querySelector(
    ".number_master__tutorial-description-wrapper"
  );
  const playTutorialButton = document.querySelector(
    ".number_master__play-tutorial-image"
  );
  const tutorialMovie = document.querySelector(
    ".number_master__tutorial-movie"
  );

  const tutorialMovieBox = document.querySelector(
    ".number_master__play-tutorial-box"
  );

  const watchMovie = document.querySelector(".number_master__watch-tutorial");



  if (!gameStartButton) {
    return null;
  }

  playTutorialButton.addEventListener("click", () => {
    tutorialDescriptionScreen.style.display = "none";
    tutorialMovie.style.display = "flex";
    tutorialMovie.play();
  });

  tutorialMovieBox.addEventListener("click", () => {
    playTutorialButton.click();
  });

  watchMovie.addEventListener("click", () => {
    playTutorialButton.click();
  });

  gameStartButton.addEventListener("click", () => {
    tutorialMovie.pause();
    tutorialScreen.style.display = "none";
  });


});
