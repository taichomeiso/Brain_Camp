document.addEventListener("turbo:load", () => {
  // 最初に全てのランキングボックスを非表示にする
  document.querySelectorAll(".top-page__ranking-box").forEach((box) => {
    box.classList.remove("active");
    box.classList.add("inactive");
  });

  // localStorage から最後にプレイしたゲームを取得
  const lastPlayedGame =
    localStorage.getItem("lastPlayedGame") || "color_rock_paper_sicissors";

  // 最後にプレイしたゲームのランキングボックスを表示
  const initialRankingBox = document.querySelector(
    `.top-page__ranking-box[data-game="${lastPlayedGame}"]`
  );
  if (initialRankingBox) {
    initialRankingBox.classList.remove("inactive");
    initialRankingBox.classList.add("active");
  }

  // トロフィー画像のクリックイベントを設定
  document.querySelectorAll(".top-page__trophy-image").forEach((trophy) => {
    const game = trophy.dataset.game; // トロフィーに紐づくゲームタイプ

    trophy.addEventListener("click", () => {
      // 全てのランキングボックスを一旦非表示にし、非アクティブ状態に
      document.querySelectorAll(".top-page__ranking-box").forEach((box) => {
        box.classList.remove("active");
        box.classList.add("inactive");
      });

      // クリックされたゲームのランキングボックスを表示・アクティブ化
      const targetBox = document.querySelector(
        `.top-page__ranking-box[data-game="${game}"]`
      );
      if (targetBox) {
        targetBox.classList.remove("inactive");
        targetBox.classList.add("active");
      }
    });
  });

  // トロフィー画像を一度回転させるイベントを設定
  document.querySelectorAll(".top-page__game-box").forEach((gameBox) => {
    const trophyImage = gameBox.querySelector(".top-page__trophy-image");

    gameBox.addEventListener("mouseenter", () => {
      // 回転クラスを一時的に追加
      trophyImage.classList.add("rotate-once");

      // アニメーションが終わる頃にクラスを削除
      setTimeout(() => {
        trophyImage.classList.remove("rotate-once");
      }, 800); // 回転アニメーション時間に合わせる
    });
  });
});
