document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得
  const scoreBox = document.querySelector(
    ".memory-square-result-page__score-display"
  );
  const memorySquareScore = localStorage.getItem("memorySquareYourScore");

  // スコアボックスがない場合、処理を中止
  if (!scoreBox) {
    return;
  }

  // 画面にスコアを表示する（スコアが存在する場合のみ）
  if (memorySquareScore) {
    scoreBox.textContent = memorySquareScore + "点!!";

    setTimeout(() => {
      scoreBox.classList.add("animate-scale");
    }, 100); // 100msの遅延
  }

  // フォームの隠しフィールドにスコアをセットする
  const scoreField = document.getElementById(
    "memory-square-result-page__score-field"
  );
  if (scoreField && memorySquareScore) {
    scoreField.value = memorySquareScore;
  }

  // フォームが存在する場合、ゲームタイプをlocalStorageに保存
  const gameForm = document.getElementById("memory-square-game-form");
  if (gameForm) {
    gameForm.addEventListener("submit", () => {
      const gameType = gameForm.dataset.game;
      localStorage.setItem("lastPlayedGame", gameType);
    });
  }
});
