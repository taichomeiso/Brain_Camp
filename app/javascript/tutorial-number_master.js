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

  const volumeBoxes = document.querySelectorAll(".number_master__volume-box");

  if (!gameStartButton) {
    return null;
  }

  // playTutorialButton.addEventListener("click", () => {
  //   tutorialDescriptionScreen.style.display = "none";
  //   tutorialMovie.style.display = "flex";
  //   volumeBoxes.forEach((volumeBox) => {
  //     volumeBox.style.display = "none";
  //   });
  //   tutorialMovie.play();
  // });

  // tutorialMovieBox.addEventListener("click", () => {
  //   playTutorialButton.click();
  // });

  // watchMovie.addEventListener("click", () => {
  //   playTutorialButton.click();
  // });

  gameStartButton.addEventListener("click", () => {
    tutorialScreen.style.display = "none";
  });


});
