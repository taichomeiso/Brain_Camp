document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得
  const scoreBox = document.querySelector(
    ".color_rock_paper_sicissors-result-page__score-display"
  );
  const color_rock_paper_sicissors_Score = localStorage.getItem(
    "color_rock_paper_sicissors_Score"
  );

  // スコアボックスがない場合、処理を中止
  if (!scoreBox) {
    return;
  }

  // 画面にスコアを表示する（スコアが存在する場合のみ）
  if (color_rock_paper_sicissors_Score) {
    scoreBox.textContent = color_rock_paper_sicissors_Score + "点";

    setTimeout(() => {
      scoreBox.classList.add("animate-scale");
    }, 100); // 100msの遅延
  }

  // フォームの隠しフィールドにスコアをセットする
  const scoreField = document.getElementById(
    "color_rock_paper_sicissors-result-page__score-field"
  );
  if (scoreField && color_rock_paper_sicissors_Score) {
    scoreField.value = color_rock_paper_sicissors_Score;
  }

  // フォームが存在する場合、ゲームタイプをlocalStorageに保存
  const gameForm = document.getElementById(
    "color-rock-paper-scissors-game-form"
  );
  if (gameForm) {
    gameForm.addEventListener("submit", () => {
      const gameType = gameForm.dataset.game;
      localStorage.setItem("lastPlayedGame", gameType);
    });
  }
});
