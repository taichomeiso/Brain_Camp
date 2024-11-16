document.addEventListener("turbo:load", () => {
  // ===== ゲームの基本UI要素の取得 =====
  // ゲーム開始とタイトルに戻るボタン
  const gameStartButton = document.getElementById(
    "memory-square__game-start-button"
  );
  const backTitleButton = document.querySelector(
    ".memory-square__BackTitleButton"
  );

  // ===== ゲームで使用する音声要素の取得 =====
  // ゲーム進行に関する効果音
  const countdownSound = document.getElementById(
    "memory-square__countdown-sound"
  );
  const correctSound = document.getElementById("memory-square__correct-sound");
  const wrongSound = document.getElementById("memory-square__wrong-sound");
  const squareAppearanceSound = document.getElementById(
    "memory-square__square-appearance-sound"
  );

  // フィーバーモード関連の音声
  const feverSound = document.getElementById("memory-square__fever-sound");
  const feverVoice = document.getElementById("memory-square__fever-voice");
  const endSound = document.getElementById("memory-square__end-sound");

  // BGM関連
  const bgmAudio = document.getElementById("memory-square__bgm-audio");
  const feverBgm = document.getElementById("memory-square__fever-bgm");

  // ===== ゲーム画面の表示要素の取得 =====
  // 主要な画面コンテナ要素
  const countdownScreen = document.querySelector(
    ".memory-square__countdown-screen"
  );
  const questionBox = document.querySelector(".memory-square__question-box");
  const gameScreen = document.querySelector(".memory-square__game-screen");

  // 画面レイアウトのコンテナ要素
  const upperContainer = document.querySelector(
    ".memory-square__upper-container"
  );
  const middleContainer = document.querySelector(
    ".memory-square__middle-container"
  );
  const lowerContainer = document.querySelector(
    ".memory-square__lower-container"
  );

  // ゲームプレイ領域の要素
  const memorySquareTable = document.querySelector(".memory-square__table");
  const memorySquareNumbers = document.querySelectorAll(
    ".memory-square__number-table td"
  );

  // ===== プログレスとスコア表示要素の取得 =====
  // タイマーとプログレス表示
  const memorySquareCount = document.getElementById(
    "memory-square__progress-count"
  );
  const memorySquareCountCircle = document.getElementById(
    "memory-square__progress-circle"
  );

  // コンボ表示関連の要素
  const memorySquareComboCount = document.querySelector(
    ".memory-square__combo-number"
  );
  const memorySquareComboCombo = document.getElementById(
    "memory-square__combo-combo"
  );
  const memorySquareComboContainer = document.querySelector(
    ".memory-square__combo-container"
  );

  // フィーバー時間表示
  const feverTimeText = document.querySelector(".memory-square__fever-time");

  // ===== ゲームのマス目要素の取得 =====
  // 個別のマス目要素
  const td1 = document.getElementById("memory-square__td1");
  const td2 = document.getElementById("memory-square__td2");
  const td3 = document.getElementById("memory-square__td3");
  const td4 = document.getElementById("memory-square__td4");
  const td5 = document.getElementById("memory-square__td5");
  const td6 = document.getElementById("memory-square__td6");
  const td7 = document.getElementById("memory-square__td7");
  const td8 = document.getElementById("memory-square__td8");
  const td9 = document.getElementById("memory-square__td9");

  // マス目の配列
  const tdArray = [td1, td2, td3, td4, td5, td6, td7, td8, td9];

  // スコア表示ボックス
  const yourScoreBox = document.querySelector(".memory-square__score-box");

  // ===== 要素存在チェック =====
  // 必須要素が存在しない場合は処理を終了
  if (!memorySquareTable || !questionBox) {
    return null;
  }

  // ===== ゲームの状態管理変数の初期化 =====
  // ゲームの進行状態を記録する配列
  const tableDataArray = []; // マス目の履歴
  const squareArray = []; // 数字の履歴
  let correctOrWrongArray = []; // 正誤の履歴

  // ゲームのスコアとカウンター
  let memorySquareYourScore = 0; // 現在のスコア
  let feverCount = 300; // フィーバーモードのカウント
  let i = 0; // 問題カウンター

  // ゲームの制限時間設定
  let timeLimit = 60; // 制限時間（秒）
  const totalGameTime = timeLimit; // 合計ゲーム時間
  const countMax = 39; // 最大問題数

  // ゲームの状態フラグ
  let previousTd = null; // 前回のマス目
  let questionActive = false; // 質問アクティブ状態
  let hardModeEnabled = false; // ハードモード状態

  // ===== ゲーム開始ボタンのクリックイベントハンドラ =====
  gameStartButton.addEventListener("click", () => {
    // カウントダウン音声の再生とUI要素の非表示化
    countdownSound.volume = 0.3;
    countdownSound.play();
    // タイトルに戻るボタンを非表示化
    backTitleButton.style.opacity = 0;
    backTitleButton.style.cursor = "none";
    backTitleButton.style.pointerEvents = "none";
    // ゲーム開始ボタンを非表示化
    gameStartButton.style.opacity = 0;
    gameStartButton.style.cursor = "none";
    gameStartButton.style.pointerEvents = "none";
    // カウントダウン画面の表示と他のコンテナの非表示
    countdownScreen.style.display = "flex";
    upperContainer.style.display = "none";
    middleContainer.style.display = "none";
    lowerContainer.style.display = "none";

    // ===== 3秒カウントダウンの実装 =====
    let countdown = 3;
    countdownScreen.innerHTML = `<div class="memory-square__countdown">${countdown}</div>`;

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        countdownScreen.innerHTML = `<div class="memory-square__countdown">${countdown}</div>`;
      } else {
        clearInterval(countdownInterval);
        countdownScreen.style.display = "none";
        startGame();
      }
    }, 1000);

    // ===== ゲーム開始時の処理 =====
    const startGame = () => {
      // BGMの設定
      bgmAudio.volume = 0.3;
      bgmAudio.loop = true;
      bgmAudio.play();
      feverBgm.volume = 0.4;
      feverBgm.loop = true;

      // ゲーム画面のコンテナ表示
      upperContainer.style.display = "flex";
      middleContainer.style.display = "flex";
      lowerContainer.style.display = "flex";

      // タイマーの設定
      const interval = 100;
      const decrement = 1 / (1000 / interval);

      // ===== ゲームタイマーの実装 =====
      const gameTimer = window.setInterval(function () {
        if (timeLimit > 0) {
          // フィーバーモードの判定と開始
          if (correctOrWrongArray.length >= 9 && !hardModeEnabled) {
            hardModeEnabled = true;
            feverBgm.play();
            bgmAudio.pause();
          }

          // フィーバーモード中の処理
          if (hardModeEnabled && feverCount > 0) {
            feverCount -= 1;
            if (feverCount === 0) {
              // フィーバーモード終了時の処理
              timeLimit = Math.max(0, timeLimit - 1);
              hardModeEnabled = false;
              feverTimeText.style.display = "none";
              memorySquareTable.classList.remove("fever-mode");
              gameScreen.classList.remove("fever-background");
              correctOrWrongArray.length = 0;
              feverBgm.pause();
              bgmAudio.play();
            }
          } else if (!hardModeEnabled) {
            // 通常モードの処理
            feverCount = 300;
            timeLimit = Math.max(0, timeLimit - decrement);
            // プログレスバーの更新
            const progressPercentage = (1 - timeLimit / totalGameTime) * 360;
            memorySquareCountCircle.style.background = `conic-gradient( rgb(148, 148, 148) ${progressPercentage}deg, rgba(69, 69, 69, 0.846) ${progressPercentage}deg)`;
            memorySquareCount.textContent = Math.floor(timeLimit);
            bgmAudio.play();
          }
        } else {
          // タイムアップ時の処理
          memorySquareTable.classList.remove("fever-mode");
          bgmAudio.pause();
          feverBgm.pause();
          endSound.volume = 0.3;
          endSound.play();

          // ゲーム終了時のUI処理
          clearInterval(gameTimer);
          upperContainer.style.display = "none";
          middleContainer.style.display = "none";
          lowerContainer.style.display = "none";
          gameScreen.innerHTML = `<div class="memory-square__the-end">Time up!!</div>`;
          memorySquareCountCircle.style.background = `conic-gradient(#232323 360deg, #232323 0deg)`;

          // スコアの保存とリザルト画面への遷移
          localStorage.setItem("memorySquareYourScore", memorySquareYourScore);
          setTimeout(() => {
            window.location.href = `/results/memory_square`;
          }, 4000);
        }
      }, interval);

      // ===== 新しい問題を設定する関数 =====
      const setNewQuestion = () => {
        // 前回の問題のクリーンアップ
        if (previousTd) {
          const previousNumberBox = previousTd.querySelector(
            ".memory-square__number-box"
          );
          if (previousNumberBox) {
            previousNumberBox.classList.remove("fade-in");
            previousNumberBox.classList.add("fade-out");

            setTimeout(() => {
              previousTd.innerHTML = "";
            }, 250);
          }
        }

        if (!questionActive) {
          setTimeout(() => {
            // ランダムなマス目と数字の生成
            const randomOfTd = Math.floor(Math.random() * tdArray.length);
            const randomTableData = tdArray[randomOfTd];
            const squareNumber = Math.floor(Math.random() * 4) + 1;

            // 質問配列の設定
            let questionArray = [
              "1個前の場所",
              "1個前の数字",
              "2個前の場所",
              "2個前の数字",
            ];
            const hardModeArray = ["3個前の場所", "3個前の数字"];

            // ハードモード時は追加の質問を含める
            if (hardModeEnabled) {
              questionArray = [...questionArray, ...hardModeArray];
            }
            let randomQuestion = Math.floor(
              Math.random() * questionArray.length
            );
            let makeQuestion = questionArray[randomQuestion];

            // 数字の表示とアニメーション
            const numberBoxClass = `memory-square__number-box memory-square__number-box--${squareNumber}`;
            squareAppearanceSound.volume = 0.4;
            squareAppearanceSound.play();
            randomTableData.innerHTML = `<div class="${numberBoxClass} fade-in">${squareNumber}</div>`;

            // 履歴の更新
            previousTd = randomTableData;
            tableDataArray.push(randomTableData);
            squareArray.push(squareNumber);

            // 過去の数字と場所の参照を保持
            let previousSquareNumber = squareArray[squareArray.length - 2];
            let previousSquareNumber2 = squareArray[squareArray.length - 3];
            let previousSquareNumber3 = squareArray[squareArray.length - 4];

            let previousSquare = tableDataArray[tableDataArray.length - 2];
            let previousSquare2 = tableDataArray[tableDataArray.length - 3];
            let previousSquare3 = tableDataArray[tableDataArray.length - 4];

            i += 1;

            // 問題表示と回答待ち
            if (i >= 3) {
              questionBox.textContent = makeQuestion;
              questionActive = true;

              if (correctOrWrongArray.length >= 9 && !hardModeEnabled) {
                hardModeEnabled = true;
              }

              waitForAnswer(
                previousSquare,
                previousSquare2,
                previousSquare3,
                previousSquareNumber,
                previousSquareNumber2,
                previousSquareNumber3
              );
            }

            // ゲームクリア判定
            if (i >= countMax) {
              memorySquareYourScore += 300;
              bgmAudio.pause();
              endSound.play();
              clearInterval(setQuestions);
              upperContainer.style.display = "none";
              middleContainer.style.display = "none";
              lowerContainer.style.display = "none";
              gameScreen.innerHTML = `<div class="memory-square__the-end">覚えマスター!!</div>`;
              localStorage.setItem(
                "memorySquareYourScore",
                memorySquareYourScore
              );
              setTimeout(() => {
                window.location.href = `/results/memory_square`;
              }, 2000);
            }
          }, 500);
        }
      };

      // 初回の問題設定と定期的な問題更新
      setNewQuestion();
      const setQuestions = setInterval(
        setNewQuestion,
        hardModeEnabled ? 2000 : 3000
      );
    };
  });

  // ===== コンボ表示の更新関数 =====
  function updateComboDisplay() {
    let correctComboLength = correctOrWrongArray.length;

    // コンボ数に応じたスコア加算
    if (correctComboLength >= 2 && correctComboLength < 5) {
      memorySquareYourScore += 5;
    } else if (correctComboLength >= 5 && correctComboLength < 10) {
      memorySquareYourScore += 10;
    } else if (correctComboLength >= 10 && correctComboLength < 18) {
      memorySquareYourScore += 15;
    } else if (correctComboLength >= 18) {
      memorySquareYourScore += 20;
    }

    // コンボ表示の状態管理
    if (correctComboLength >= 2 && correctComboLength <= 8) {
      // 通常のコンボ表示
      feverTimeText.style.display = "none";
      memorySquareComboContainer.style.display = "flex";
      memorySquareComboCombo.style.display = "block";
      memorySquareComboCount.style.display = "block";
      memorySquareComboCount.textContent = correctComboLength;
    } else if (correctComboLength === 9) {
      // フィーバーモード開始時の処理
      memorySquareTable.classList.add("fever-mode");
      gameScreen.classList.add("fever-background");
      feverTimeText.style.display = "flex";
      memorySquareComboCount.style.display = "none";
      memorySquareComboCombo.style.display = "none";
      bgmAudio.pause();
      feverVoice.volume = 1;
      feverSound.volume = 0.1;
      feverBgm.volume = 0.3;
      feverVoice.play();
      feverSound.play();
      feverBgm.play();
    } else if (correctComboLength === 0) {
      // コンボリセット時の処理
      memorySquareTable.classList.remove("fever-mode");
      gameScreen.classList.remove("fever-background");
      feverBgm.pause();
      bgmAudio.volume = 0.2;
      bgmAudio.play();
      memorySquareComboContainer.style.display = "none";
    }

    // スコア表示の更新
    yourScoreBox.textContent = memorySquareYourScore;
  }

  // ===== ユーザーの数字クリック待機関数 =====
  function waitForUserNumberClick() {
    return new Promise((resolve) => {
      const clickHandler = (number) => {
        // クリック後にイベントリスナーを削除
        memorySquareNumbers.forEach((n) => {
          n.removeEventListener("click", clickHandlers.get(n));
        });
        resolve(number);
      };

      // 各数字マスにイベントリスナーを設定
      const clickHandlers = new Map();
      memorySquareNumbers.forEach((number) => {
        const handler = () => clickHandler(number);
        clickHandlers.set(number, handler);
        number.addEventListener("click", handler);
      });
    });
  }

  // ===== ユーザーのマスクリック待機関数 =====
  function waitForUserSquareClick() {
    return new Promise((resolve) => {
      const clickHandler = (td) => {
        // クリック後にイベントリスナーを削除
        tdArray.forEach((t) => {
          t.removeEventListener("click", clickHandlers.get(t));
        });
        resolve(td);
      };

      // 各マスにイベントリスナーを設定
      const clickHandlers = new Map();
      tdArray.forEach((td) => {
        const handler = () => clickHandler(td);
        clickHandlers.set(td, handler);
        td.addEventListener("click", handler);
      });
    });
  }

  // ===== 数字クリックの正誤判定関数 =====
  function checkUserNumberClick(
    clickedNumber,
    previousSquareNumber,
    previousSquareNumber2,
    previousSquareNumber3
  ) {
    if (!questionActive) return;

    const clickedValue = clickedNumber.textContent;
    let isCorrect = false;
    let scoreIncrement = 0;

    // 質問タイプに応じた正誤判定
    switch (questionBox.textContent) {
      case "1個前の数字":
        isCorrect = clickedValue === String(previousSquareNumber);
        scoreIncrement = 50;
        break;
      case "2個前の数字":
        isCorrect = clickedValue === String(previousSquareNumber2);
        scoreIncrement = 50;
        break;
      case "3個前の数字":
        isCorrect = clickedValue === String(previousSquareNumber3);
        scoreIncrement = 100;
        break;
    }

    // 正誤に応じた処理
    if (isCorrect) {
      // 正解時の処理
      questionBox.textContent = "◯";
      correctSound.volume = 0.2;
      correctSound.play();
      memorySquareYourScore += scoreIncrement * (hardModeEnabled ? 2 : 1);
      correctOrWrongArray.push("◯");
    } else {
      // 不正解時の処理
      questionBox.textContent = "×";
      wrongSound.volume = 0.2;
      wrongSound.play();
      correctOrWrongArray = [];
      hardModeEnabled = false;
    }

    // 表示の更新
    updateComboDisplay();
    yourScoreBox.textContent = memorySquareYourScore;
    questionActive = false;
  }

  // ===== マスクリックの正誤判定関数 =====
  function checkUserSquareClick(
    clickedSquare,
    previousSquare,
    previousSquare2,
    previousSquare3
  ) {
    if (!questionActive) return;

    let isCorrect = false;
    let scoreIncrement = 0;

    // 質問タイプに応じた正誤判定
    switch (questionBox.textContent) {
      case "1個前の場所":
        isCorrect = previousSquare && clickedSquare.id === previousSquare.id;
        scoreIncrement = 50;
        break;
      case "2個前の場所":
        isCorrect = previousSquare2 && clickedSquare.id === previousSquare2.id;
        scoreIncrement = 50;
        break;
      case "3個前の場所":
        isCorrect = previousSquare3 && clickedSquare.id === previousSquare3.id;
        scoreIncrement = 100;
        break;
    }

    // 正誤に応じた処理
    if (isCorrect) {
      // 正解時の処理
      questionBox.textContent = "◯";
      correctSound.volume = 0.2;
      correctSound.play();
      memorySquareYourScore += scoreIncrement * (hardModeEnabled ? 2 : 1);
      correctOrWrongArray.push("◯");
    } else {
      // 不正解時の処理
      questionBox.textContent = "×";
      wrongSound.volume = 0.2;
      wrongSound.play();
      correctOrWrongArray = [];
      hardModeEnabled = false;
    }

    // 表示の更新
    updateComboDisplay();
    yourScoreBox.textContent = memorySquareYourScore;
    questionActive = false;
  }

  // ===== ユーザーの回答待機処理関数 =====
  async function waitForAnswer(
    previousSquare,
    previousSquare2,
    previousSquare3,
    previousSquareNumber,
    previousSquareNumber2,
    previousSquareNumber3
  ) {
    // 質問タイプの判定
    const currentQuestion = questionBox.textContent;
    const isNumberQuestion = [
      "1個前の数字",
      "2個前の数字",
      "3個前の数字",
    ].includes(currentQuestion);

    const isSquareQuestion = [
      "1個前の場所",
      "2個前の場所",
      "3個前の場所",
    ].includes(currentQuestion);

    let highlightElements;
    let nonHighlightElements;

    // 質問タイプに応じたハイライト要素の設定
    if (isNumberQuestion) {
      highlightElements = memorySquareNumbers;
      nonHighlightElements = tdArray;
    } else if (isSquareQuestion) {
      highlightElements = tdArray;
      nonHighlightElements = memorySquareNumbers;
    } else {
      console.warn("Unexpected question type:", currentQuestion);
      highlightElements = [];
      nonHighlightElements = [];
    }

    // クリック可能な要素のハイライト設定
    highlightElements.forEach((element) => {
      if (element) {
        element.addEventListener("mouseover", () => {
          element.style.border = "3px solid orange";
        });
        element.addEventListener("mouseout", () => {
          element.style.border = "";
        });
      }
    });

    // クリック不可要素のハイライト解除
    nonHighlightElements.forEach((element) => {
      if (element) {
        element.addEventListener("mouseover", () => {
          element.style.border = "";
        });
        element.addEventListener("mouseout", () => {
          element.style.border = "";
        });
      }
    });

    // 質問タイプに応じた回答処理
    if (isNumberQuestion) {
      // 数字問題の処理
      const clickedNumber = await waitForUserNumberClick();
      checkUserNumberClick(
        clickedNumber,
        previousSquareNumber,
        previousSquareNumber2,
        previousSquareNumber3
      );
    } else if (isSquareQuestion) {
      // マス目問題の処理
      const clickedSquare = await waitForUserSquareClick();
      checkUserSquareClick(
        clickedSquare,
        previousSquare,
        previousSquare2,
        previousSquare3
      );
    }
  }
});
