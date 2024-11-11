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
  function fetchAndUpdateRanking(gameType, url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`Received data for ${gameType}:`, data);
        const rankingBox = document.querySelector(`.top-page__ranking-box[data-game="${gameType}"] .top-page__ranking-number-list`);

        if (!rankingBox) {
          console.error(`ランキングボックスが見つかりません。gameType: ${gameType}`);
          return;
        }

        rankingBox.innerHTML = ""; // 既存のランキングをクリア

        data.forEach((ranking, index) => {
          const scoreOrTime = gameType === "number_master" ? ranking.game_time : ranking.score;
          const rankingHTML = `
            <div class="top-page__ranking-number${index + 1 <= 3 ? index + 1 : ' other'}">
              <div class="top-page__ranking-number-box">
                <span class="${index === 0 ? 'top-page__gold-number' : index === 1 ? 'top-page__silver-number' : index === 2 ? 'top-page__bronze-number' : ''}">
                  ${index + 1}位
                </span>
              </div>
              <div class="top-page__ranking-nickname-box">${ranking.nickname}</div>
              <div class="top-page__ranking-score-box">${scoreOrTime}</div>
            </div>`;
          rankingBox.insertAdjacentHTML("beforeend", rankingHTML);
        });
      })
      .catch(error => console.error("ランキングの更新に失敗しました:", error));
  }

  // 各ゲームタイプのランキングを定期的に更新
  setInterval(() => {
    fetchAndUpdateRanking("color_rock_paper_sicissors", "/rankings/color_rock_paper_sicissors");
    fetchAndUpdateRanking("number_master", "/rankings/number_master");
    fetchAndUpdateRanking("memory_square", "/rankings/memory_square");
  }, 30000); // 30秒ごとに更新
  // 初期状態で「色勝ちじゃんけん」ランキングを表示
  document.querySelector('.top-page__ranking-box[data-game="color_rock_paper_sicissors"]').classList.add("active");

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
