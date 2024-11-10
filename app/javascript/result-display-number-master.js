document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得
  const scoreBox = document.querySelector(".gameTime");

  if (!scoreBox) {
    return;
  }

  // スコアが存在する場合に画面にスコアを表示する

  setTimeout(() => {
    scoreBox.classList.add("animate-scale");
  }, 100); // 100msの遅延

  // フォームが存在する場合、ゲームタイプをlocalStorageに保存
  const gameForm = document.getElementById("number-master-game-form");
  if (gameForm) {
    gameForm.addEventListener("submit", () => {
      const gameType = gameForm.dataset.game;
      localStorage.setItem("lastPlayedGame", gameType);
    });
  }
});
