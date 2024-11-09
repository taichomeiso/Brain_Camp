document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得

  const scoreBox = document.querySelector(
    ".color_rock_paper_sicissors-result-page__score-display"
  );
  const color_rock_paper_sicissors_Score = localStorage.getItem(
    "color_rock_paper_sicissors_Score"
  );

  if (!scoreBox) {
    return null;
  }
  // 画面にスコアを表示する

  scoreBox.textContent = color_rock_paper_sicissors_Score + "点";

  setTimeout(() => {
    scoreBox.classList.add("animate-scale");
  }, 100); // 100msの遅延

  // フォームの隠しフィールドにスコアをセットする
  const scoreField = document.getElementById(
    "color_rock_paper_sicissors-result-page__score-field"
  );
  if (scoreField && color_rock_paper_sicissors_Score) {
    scoreField.value = color_rock_paper_sicissors_Score;
  }
});
