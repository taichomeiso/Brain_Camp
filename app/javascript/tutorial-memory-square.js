document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById(
    "memory-square__game-start-button"
  );
  const backTitleButton = document.querySelector(
    ".memory-square__BackTitleButton"
  );

  // 音声要素の取得
  const clickSound = document.getElementById("game-start-id");
  const gameReturnSound = document.getElementById("game-return-id");

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

  const tutorialMovieBox = document.querySelector(
    ".memory-square__play-tutorial-box"
  );

  const watchMovie = document.querySelector(".memory-square__watch-tutorial");

  if (!gameStartButton) {
    return null;
  }

  gameStartButton.addEventListener("click", () => {
    tutorialMovie.pause();
    tutorialScreen.style.display = "none";

    // ゲームスタートボタンにクリック音を追加
    clickSound.volume = 0.5;
    clickSound.play();
  });

  backTitleButton.addEventListener("click", (event) => {
    event.preventDefault(); // デフォルトのリンク動作を一時停止
    gameReturnSound.volume = 0.5; // 音量を設定
    gameReturnSound.play(); // 音声を再生

    // 音声が終わった後にページ遷移
    gameReturnSound.addEventListener("ended", () => {
      window.location.href = backTitleButton.href; // 元のリンク先に遷移
    });
  });

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
