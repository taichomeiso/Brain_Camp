document.addEventListener("DOMContentLoaded", () => {
  // 初期状態で「色勝ちじゃんけん」ランキングを表示
  document.querySelector('.top-page__ranking-box[data-game="color_rock_paper_sicissors"]').classList.add("active");

  // トロフィー画像にクリックイベントを追加
  document.querySelectorAll(".top-page__trophy-image").forEach((trophy) => {
    const game = trophy.dataset.game; // 対応するランキングのgame属性を取得

    trophy.addEventListener("click", () => {
      // 全てのランキングボックスを非表示に
      document.querySelectorAll(".top-page__ranking-box").forEach((box) => {
        box.classList.remove("active");
      });

      // クリックされたゲームのランキングボックスを表示
      const targetBox = document.querySelector(`.top-page__ranking-box[data-game="${game}"]`);
      if (targetBox) {
        targetBox.classList.add("active");
      }
    });
  });
});
// ランキングの変更を強調
document.querySelectorAll(".top-page__trophy-image").forEach((trophy) => {
  trophy.addEventListener("click", () => {
    document.querySelectorAll(".top-page__ranking-box").forEach((box) => {
      box.classList.remove("active");
      box.classList.add("inactive");
    });

    const game = trophy.dataset.game;
    const targetBox = document.querySelector(`.top-page__ranking-box[data-game="${game}"]`);
    if (targetBox) {
      targetBox.classList.remove("inactive");
      targetBox.classList.add("active");
    }
  });
});