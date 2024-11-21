document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById("startButton");
  const backTitleButton = document.querySelector(
    ".number-master__BackTitleButton"
  );
  // 音声要素の取得
  const clickSound = document.getElementById("game-start-id");
  const gameReturnSound = document.getElementById("game-return-id");

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
