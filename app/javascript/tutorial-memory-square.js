document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById(
    "memory-square__game-start-button"
  );
  const tutorialScreen = document.querySelector(
    ".memory-square__tutorial-movie-screen"
  );
  const tutorialDescriptionScreen = document.querySelector(
    ".memory-square__tutorial-description-wrapper"
  );
  const playTutorialButton = document.querySelector(
    ".memory-square__play-tutorial-image"
  );
  const tutorialMovie = document.querySelector(
    ".memory-square__tutorial-movie"
  );

  const volumeBoxes = document.querySelectorAll(".memory-square__volume-box");

  if (!gameStartButton) {
    return null;
  }

  playTutorialButton.addEventListener("click", () => {
    tutorialDescriptionScreen.style.display = "none";
    tutorialMovie.style.display = "flex";
    volumeBoxes.forEach((volumeBox) => {
      volumeBox.style.display = "none";
    });
    tutorialMovie.play();
  });

  gameStartButton.addEventListener("click", () => {
    tutorialScreen.style.display = "none";
  });
});
