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
 // 音声要素の取得
 const buttonClickSound = document.getElementById("result-button-click-sound");
 const formClickSound = document.getElementById("result-form-click-sound");
 const hoverSound = document.getElementById("result-hover-sound");
 const pageSound = document.getElementById("result-page-sound");

 // ページ表示時に再生
 if (pageSound) {
   pageSound.volume = 0.5; // 音量調整
   pageSound.play();
 }

 // ボタンクリック時の音声再生設定
 const buttons = document.querySelectorAll("button,.result-page__retry-button, .result-page__back-to-home-button"); ; // ボタン要素を取得
 buttons.forEach(button => {
   button.addEventListener("click", () => {
     if (buttonClickSound) {
       buttonClickSound.currentTime = 0; // 再生位置をリセット
       buttonClickSound.play();
     }
   });
 });

 // フォームの入力部分クリック時の音声再生設定
 const formInputs = document.querySelectorAll("input, textarea"); // フォーム入力要素を取得
 formInputs.forEach(input => {
   input.addEventListener("click", () => {
     if (formClickSound) {
       formClickSound.currentTime = 0; // 再生位置をリセット
       formClickSound.play();
     }
   });
 });

 // ホバー時の音声再生設定（ボタンとフォームの要素）
 const hoverElements = document.querySelectorAll("button, input, textarea,.result-page__retry-button, .result-page__back-to-home-button, .hover-area .button-icon"); // ホバー対象要素を取得
 hoverElements.forEach(element => {
   element.addEventListener("mouseenter", () => {
     if (hoverSound) {
       hoverSound.currentTime = 0; // 再生位置をリセット
       hoverSound.play();
     }
   });
 });
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
