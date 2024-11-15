document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得
  const scoreBox = document.querySelector(".gameTime");

  if (!scoreBox) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const gameTime = urlParams.get("game_time");

  // ゲームタイムを表示する要素にセット
  if (gameTime) {
    const gameTimeElement = document.querySelector(".gameTime");
    if (gameTimeElement) {
      gameTimeElement.innerText = ` ${gameTime}秒`;
    }
  }

  // スコアが存在する場合に画面にスコアを表示する

  setTimeout(() => {
    scoreBox.classList.add("animate-scale");
  }, 100); // 100msの遅延
  const typingElement = document.getElementById("typing-text");
  const text = typingElement.innerHTML; // innerHTMLで改行を含むテキストを取得
  typingElement.innerHTML = ""; // テキストをクリア
  const audio = document.getElementById("result-message-sound"); // 音声要素を取得
  audio.volume = 0.5;
  const totalDuration = 1800; // タイピングを終えるまでの目標時間（ミリ秒）
  const typingSpeed = totalDuration / text.length; // 1文字あたりの表示時間を計算

  let index = 0;

  function type() {
    if (index < text.length) {
      // `<br>`タグが含まれている場合は改行として処理
      if (text.slice(index, index + 4) === "<br>") {
        typingElement.innerHTML += "<br>";
        index += 4; // `<br>`タグの長さだけインデックスを進める
      } else {
        typingElement.innerHTML += text.charAt(index);
        index++;
      }
      // タイピングごとに音声を再生
      if (audio) {
        audio.currentTime = 0; // 再生位置をリセット
        audio.play(); // 音を再生
      }
      setTimeout(type, typingSpeed); // 計算された速度で次の文字を表示
    } else {
      // タイピングが終わったら音声を停止し、カーソルを消す（オプション）
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // 再生位置をリセット
      }
      typingElement.style.borderRight = "none";
    }
  }

  type();
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
  const buttons = document.querySelectorAll(
    "button,.result-page__retry-button, .result-page__back-to-home-button"
  ); // ボタン要素を取得
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (buttonClickSound) {
        buttonClickSound.currentTime = 0; // 再生位置をリセット
        buttonClickSound.play();
      }
    });
  });

  // フォームの入力部分クリック時の音声再生設定
  const formInputs = document.querySelectorAll("input, textarea"); // フォーム入力要素を取得
  formInputs.forEach((input) => {
    input.addEventListener("click", () => {
      if (formClickSound) {
        formClickSound.currentTime = 0; // 再生位置をリセット
        formClickSound.play();
      }
    });
  });

  // ホバー時の音声再生設定（ボタンとフォームの要素）
  const hoverElements = document.querySelectorAll(
    "button, input, textarea,.result-page__retry-button, .result-page__back-to-home-button, .hover-area .button-icon"
  ); // ホバー対象要素を取得
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      if (hoverSound) {
        hoverSound.currentTime = 0; // 再生位置をリセット
        hoverSound.play();
      }
    });
  });
  // フォームが存在する場合、ゲームタイプをlocalStorageに保存
  const gameForm = document.getElementById("number-master-game-form");
  if (gameForm) {
    gameForm.addEventListener("submit", () => {
      const gameType = gameForm.dataset.game;
      localStorage.setItem("lastPlayedGame", gameType);
    });
  }
});

document.addEventListener("turbo:render", () => {
  // ローカルストレージからスコアを取得
  const scoreBox = document.querySelector(".gameTime");

  if (!scoreBox) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const gameTime = urlParams.get("game_time");
  setTimeout(() => {
    window.location.href = `/results/number_master?game_time=${encodeURIComponent(
      gameTime
    )}`;
  }, 4000);

  // ゲームタイムを表示する要素にセット
  if (gameTime) {
    const gameTimeElement = document.querySelector(".gameTime");
    if (gameTimeElement) {
      gameTimeElement.innerText = ` ${gameTime}秒`;
    }
  }

  // スコアが存在する場合に画面にスコアを表示する

  setTimeout(() => {
    scoreBox.classList.add("animate-scale");
  }, 100); // 100msの遅延
  const typingElement = document.getElementById("typing-text");
  const text = typingElement.innerHTML; // innerHTMLで改行を含むテキストを取得
  typingElement.innerHTML = ""; // テキストをクリア
  const audio = document.getElementById("result-message-sound"); // 音声要素を取得
  audio.volume = 0.5;
  const totalDuration = 1800; // タイピングを終えるまでの目標時間（ミリ秒）
  const typingSpeed = totalDuration / text.length; // 1文字あたりの表示時間を計算

  let index = 0;

  function type() {
    if (index < text.length) {
      // `<br>`タグが含まれている場合は改行として処理
      if (text.slice(index, index + 4) === "<br>") {
        typingElement.innerHTML += "<br>";
        index += 4; // `<br>`タグの長さだけインデックスを進める
      } else {
        typingElement.innerHTML += text.charAt(index);
        index++;
      }
      // タイピングごとに音声を再生
      if (audio) {
        audio.currentTime = 0; // 再生位置をリセット
        audio.play(); // 音を再生
      }
      setTimeout(type, typingSpeed); // 計算された速度で次の文字を表示
    } else {
      // タイピングが終わったら音声を停止し、カーソルを消す（オプション）
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // 再生位置をリセット
      }
      typingElement.style.borderRight = "none";
    }
  }

  type();
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
  const buttons = document.querySelectorAll(
    "button,.result-page__retry-button, .result-page__back-to-home-button"
  ); // ボタン要素を取得
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (buttonClickSound) {
        buttonClickSound.currentTime = 0; // 再生位置をリセット
        buttonClickSound.play();
      }
    });
  });

  // フォームの入力部分クリック時の音声再生設定
  const formInputs = document.querySelectorAll("input, textarea"); // フォーム入力要素を取得
  formInputs.forEach((input) => {
    input.addEventListener("click", () => {
      if (formClickSound) {
        formClickSound.currentTime = 0; // 再生位置をリセット
        formClickSound.play();
      }
    });
  });

  // ホバー時の音声再生設定（ボタンとフォームの要素）
  const hoverElements = document.querySelectorAll(
    "button, input, textarea,.result-page__retry-button, .result-page__back-to-home-button, .hover-area .button-icon"
  ); // ホバー対象要素を取得
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      if (hoverSound) {
        hoverSound.currentTime = 0; // 再生位置をリセット
        hoverSound.play();
      }
    });
  });
  // フォームが存在する場合、ゲームタイプをlocalStorageに保存
  const gameForm = document.getElementById("number-master-game-form");
  if (gameForm) {
    gameForm.addEventListener("submit", () => {
      const gameType = gameForm.dataset.game;
      localStorage.setItem("lastPlayedGame", gameType);
    });
  }
});
