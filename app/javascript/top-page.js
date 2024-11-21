document.addEventListener("turbo:load", () => {
  // トップページの特定の要素を取得し、存在しない場合は処理を終了
  const topPageElement = document.querySelector(".top-page__ranking-box");
  if (!topPageElement) {
    return; // トップページでない場合、処理を終了
  }
  const bgm = document.getElementById("top-bgm");
  if (bgm) {
    bgm.volume = 0.1; // 20%の音量で再生
  }

  // 最初に全てのランキングボックスを非表示にする
  document.querySelectorAll(".top-page__ranking-box").forEach((box) => {
    box.classList.remove("active");
    box.classList.add("inactive");
  });
  const TopHoverSound = document.getElementById("top-hover");
  const RankChangeSound = document.getElementById("top-ranking-change");
  const TopButtonClickSound = document.getElementById("top-button-click");
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
      .then((response) => response.json())
      .then((data) => {
        console.log(`Received data for ${gameType}:`, data);
        const rankingBox = document.querySelector(
          `.top-page__ranking-box[data-game="${gameType}"] .top-page__ranking-number-list`
        );

        if (!rankingBox) {
          console.error(
            `ランキングボックスが見つかりません。gameType: ${gameType}`
          );
          return;
        }

        rankingBox.innerHTML = ""; // 既存のランキングをクリア
        // 最新IDを取得
        const latestId = window.latestRankingIdFor[gameType];
        data.forEach((ranking, index) => {
          const scoreOrTime =
            gameType === "number_master" ? ranking.game_time : ranking.score;
          const isNew = ranking.id === latestId; // 最新IDと一致するか判定
          const rankingHTML = `
            <div class="top-page__ranking-number${
              index + 1 <= 3 ? index + 1 : " other"
            }">
              <div class="top-page__ranking-number-box">
                <span class="${
                  index === 0
                    ? "top-page__gold-number"
                    : index === 1
                    ? "top-page__silver-number"
                    : index === 2
                    ? "top-page__bronze-number"
                    : ""
                }">
                  ${index + 1}位
                </span>
              </div>
                <div class="top-page__ranking-nickname-box">
               ${
                 isNew ? '<span class="new-label">NEW</span>' : ""
               } <!-- NEWラベルを追加 -->
                ${ranking.nickname}
               </div>    
              <div class="top-page__ranking-score-box">${scoreOrTime}</div>
            </div>`;
          rankingBox.insertAdjacentHTML("beforeend", rankingHTML);
        });
      })
      .catch((error) =>
        console.error("ランキングの更新に失敗しました:", error)
      );
  }
  
      // 初期表示時のランキング更新
      fetchAndUpdateRanking(
        "color_rock_paper_sicissors",
        "/rankings/color_rock_paper_sicissors"
      );
      fetchAndUpdateRanking("number_master", "/rankings/number_master");
      fetchAndUpdateRanking("memory_square", "/rankings/memory_square");
  
      // 各ゲームタイプのランキングを定期的に更新
      setInterval(() => {
        fetchAndUpdateRanking(
          "color_rock_paper_sicissors",
          "/rankings/color_rock_paper_sicissors"
        );
        fetchAndUpdateRanking("number_master", "/rankings/number_master");
        fetchAndUpdateRanking("memory_square", "/rankings/memory_square");
      }, 7000); // 7秒ごとに更新
  
  // 初期状態で「色勝ちじゃんけん」ランキングを表示
  document
    .querySelector(
      '.top-page__ranking-box[data-game="color_rock_paper_sicissors"]'
    )
    .classList.add("active");

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
        // ランキング変更音を再生
        if (RankChangeSound) {
          RankChangeSound.currentTime = 0; // 再生位置をリセット
          RankChangeSound.play();
        }
      }
    });
  });
  // リンククリック時の音声再生と遅延
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (TopButtonClickSound) {
        event.preventDefault(); // デフォルトのリンク動作を一旦キャンセル
        TopButtonClickSound.currentTime = 0;
        TopButtonClickSound.volume = 0.3;
        TopButtonClickSound.play();

        // 音が聞こえる時間を作るために遅延を入れてから遷移
        setTimeout(() => {
          window.location.href = link.href;
        }, 500); // 500ms遅延
      }
    });
  });
  // トロフィー画像を一度回転させるイベントを設定
  document.querySelectorAll(".top-page__game-box").forEach((gameBox) => {
    const trophyImage = gameBox.querySelector(".top-page__trophy-image");

    gameBox.addEventListener("mouseenter", () => {
      // 回転クラスを一時的に追加
      trophyImage.classList.add("rotate-once");
      document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("mouseenter", () => {
          if (TopHoverSound) {
            TopHoverSound.currentTime = 0; // 再生位置をリセット
            TopHoverSound.volume = 0.3;
            TopHoverSound.play();
          }
        });
      });
      // アニメーションが終わる頃にクラスを削除
      setTimeout(() => {
        trophyImage.classList.remove("rotate-once");
      }, 800); // 回転アニメーション時間に合わせる
    });
  });
});

