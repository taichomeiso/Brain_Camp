document.addEventListener("turbo:load", () => {
  const gameStartButton = document.getElementById(
    "color_rock_paper_gameStartButton_id"
  );
  const backTitleButton = document.querySelector(
    ".color_rock_paper_sicissors-BackTitleButton"
  );

  // 音声要素の取得
  const gameReturnSound = document.getElementById("game-return-id");
  const gameStartSound = document.getElementById("game-start-id");

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

  //タイトルに戻るボタンにクリック音追加
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
    // volumeBoxes.forEach((volumeBox) => {
    // volumeBox.style.display = "none";
    // });
    tutorialMovie.play();
  });

  gameStartButton.addEventListener("click", () => {
    gameStartSound.volume = 0.5; // 音量調整 (0.0 ~ 1.0)
    gameStartSound.play(); // 音声再生
    tutorialMovie.pause();
    tutorialScreen.style.display = "none";
  });
});
