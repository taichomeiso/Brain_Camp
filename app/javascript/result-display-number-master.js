document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得

  const scoreBox = document.querySelector(".gameTime");

  if (!scoreBox) {
    return null;
  }
  // 画面にスコアを表示する

  setTimeout(() => {
    scoreBox.classList.add("animate-scale");
  }, 100); // 100msの遅延
});
