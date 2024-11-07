document.addEventListener("turbo:load", () => {
  // ゲームに関連する要素を取得
  const gameStartButton = document.getElementById(
    "memory-square__game-start-button"
  );
  const backTitleButton = document.querySelector(
    ".memory-square__BackTitleButton"
  );

  const correctSound = document.getElementById("memory-square__correct-sound");
  const wrongSound = document.getElementById("memory-square__wrong-sound");
  const squareAppearanceSound = document.getElementById(
    "memory-square__square-appearance-sound"
  );
  const feverSound = document.getElementById("memory-square__fever-sound");
  const bgmAudio = document.getElementById("memory-square__bgm-audio");
  const volumeBoxes = document.querySelectorAll(".memory-square__volume-box");
  const volumeOnImages = document.querySelectorAll(
    ".memory-square__volume-on-img"
  );
  const volumeOffImages = document.querySelectorAll(
    ".memory-square__volume-off-img"
  );


  const countdownScreen = document.querySelector(
    ".memory-square__countdown-screen"
  );
  const questionBox = document.querySelector(".memory-square__question-box");
  const gameScreen = document.querySelector(".memory-square__game-screen");
  const upperContainer = document.querySelector(
    ".memory-square__upper-container"
  );
  const middleContainer = document.querySelector(
    ".memory-square__middle-container"
  );
  const lowerContainer = document.querySelector(
    ".memory-square__lower-container"
  );
  const memorySquareTable = document.querySelector(".memory-square__table");
  const memorySquareNumbers = document.querySelectorAll(
    ".memory-square__number-table td"
  );
  const memorySquareCount = document.getElementById(
    "memory-square__progress-count"
  );
  const memorySquareCountCircle = document.getElementById(
    "memory-square__progress-circle"
  );

  const memorySquareComboCount = document.querySelector(
    ".memory-square__combo-number"
  );

  const memorySquareComboCombo = document.getElementById(
    "memory-square__combo-combo"
  );

  const memorySquareComboContainer = document.querySelector(
    ".memory-square__combo-container"
  );

  // const combo1Image = document.querySelector(".memory-square__combo1");
  // const combo2Image = document.querySelector(".memory-square__combo2");
  // const combo3Image = document.querySelector(".memory-square__combo3");
  // const combo4Image = document.querySelector(".memory-square__combo4");
  // const combo5Image = document.querySelector(".memory-square__combo5");
  // const combo6Image = document.querySelector(".memory-square__combo6");
  // const combo7Image = document.querySelector(".memory-square__combo7");
  // const combo8Image = document.querySelector(".memory-square__combo8");
  // const combo9Image = document.querySelector(".memory-square__combo9");

  // const comboImageArray = [
  //   combo1Image,
  //   combo2Image,
  //   combo3Image,
  //   combo4Image,
  //   combo5Image,
  //   combo6Image,
  //   combo7Image,
  //   combo8Image,
  //   combo9Image,
  // ];
  const feverTimeText = document.querySelector(".memory-square__fever-time");

  // 9つのマス目を取得
  const td1 = document.getElementById("memory-square__td1");
  const td2 = document.getElementById("memory-square__td2");
  const td3 = document.getElementById("memory-square__td3");
  const td4 = document.getElementById("memory-square__td4");
  const td5 = document.getElementById("memory-square__td5");
  const td6 = document.getElementById("memory-square__td6");
  const td7 = document.getElementById("memory-square__td7");
  const td8 = document.getElementById("memory-square__td8");
  const td9 = document.getElementById("memory-square__td9");

  const tdArray = [td1, td2, td3, td4, td5, td6, td7, td8, td9]; // マス目を配列に格納

  const yourScoreBox = document.querySelector(".memory-square__score-box");

  if (!memorySquareTable || !questionBox) {
    return null;
  } // テーブルや質問ボックスが無い場合は終了

  volumeBoxes.forEach((volumeBox, index) => {
    volumeBox.addEventListener("click", (event) => {
      event.stopPropagation(); // バブリングを防ぐ

      const volumeOnImage = volumeOnImages[index];
      const volumeOffImage = volumeOffImages[index];

      // 要素の現在の表示状態を確認
      if (volumeOnImage.style.display === "none") {
        bgmAudio.pause(); // 再生停止
        bgmAudio.currentTime = 0; // 再生位置を最初に戻す
        volumeOnImage.style.display = "flex";
        volumeOffImage.style.display = "none";
      } else if (volumeOnImage.style.display === "flex") {
        bgmAudio.loop = true;
        bgmAudio.play();
        bgmAudio.volume = 0.4; // 音量を設定
        volumeOffImage.style.display = "flex";
        volumeOnImage.style.display = "none";
      }
    });
  });

  // 初期表示の設定
  volumeOnImages.forEach((volumeOnImage) => {
    volumeOnImage.style.display = "flex"; // 初期状態を表示に設定
  });
  volumeOffImages.forEach((volumeOffImage) => {
    volumeOffImage.style.display = "none"; // 初期状態を非表示に設定
  });

  const tableDataArray = [];
  const squareArray = [];
  let correctOrWrongArray = [];
  let memorySquareYourScore = 0;
  let feverCount = 300;
  let i = 0;
  let timeLimit = 60;
  const totalGameTime = timeLimit;
  const countMax = 36;
  let previousTd = null;
  let questionActive = false;
  let hardModeEnabled = false;

  gameStartButton.addEventListener("click", () => {
    countdownSound.volume = 0.4;
    countdownSound.play();
    backTitleButton.style.opacity = 0;
    backTitleButton.style.cursor = "none";
    backTitleButton.style.pointerEvents = "none";
    gameStartButton.style.opacity = 0;
    gameStartButton.style.cursor = "none";
    gameStartButton.style.pointerEvents = "none";
    countdownScreen.style.display = "flex";
    upperContainer.style.display = "none";
    middleContainer.style.display = "none";
    lowerContainer.style.display = "none";
    volumeBoxes.forEach((volumeBox) => {
      volumeBox.style.display = "flex";
    });

    // カウントダウンの設定
    let countdown = 3; // 3秒からスタート
    countdownScreen.innerHTML = `<div class="memory-square__countdown">${countdown}</div>`; // カウントダウンを表示

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        countdownScreen.innerHTML = `<div class="memory-square__countdown">${countdown}</div>`;
      } else {
        clearInterval(countdownInterval);
        countdownScreen.style.display = "none";
        startGame(); // ゲームを開始
      }
    }, 1000); // 1秒ごとにカウントダウン

    const startGame = () => {
      upperContainer.style.display = "flex";
      middleContainer.style.display = "flex";
      lowerContainer.style.display = "flex";
      const interval = 100; // 100msごとに更新
      const decrement = 1 / (1000 / interval); // timeLimit減少量の分割

      const gameTimer = window.setInterval(function () {
        if (timeLimit > 0) {
          if (!hardModeEnabled) {
            // timeLimit が 0 より小さくならないように調整
            timeLimit = Math.max(0, timeLimit - decrement);
            const progressPercentage = (1 - timeLimit / totalGameTime) * 360;

            // プログレスバーの色を更新
            memorySquareCountCircle.style.background = `conic-gradient( rgb(148, 148, 148) ${progressPercentage}deg, rgba(69, 69, 69, 0.846) ${progressPercentage}deg)`;

            // カウントダウン表示の更新（整数のみ表示）
            memorySquareCount.textContent = Math.floor(timeLimit);
          } else {
            if (feverCount > 0) {
              feverCount -= 1;
            } else {
              feverCount = 300;
              timeLimit = Math.max(0, timeLimit - 1);
              hardModeEnabled = false;
            }
          }
        } else {
          bgmAudio.pause(); // 再生停止
          clearInterval(gameTimer);
          upperContainer.style.display = "none";
          middleContainer.style.display = "none";
          lowerContainer.style.display = "none";
          gameScreen.innerHTML = `<div class="memory-square__the-end">Time up!!</div>`;
          memorySquareCountCircle.style.background = `conic-gradient(#232323 360deg, #232323 0deg)`;

          localStorage.setItem("memorySquareYourScore", memorySquareYourScore);
          setTimeout(() => {
            window.location.href = `/results/memory_square`;
          }, 2000);
        }
      }, interval);

      // 初回質問設定処理をすぐに実行
      const setNewQuestion = () => {
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
            const randomOfTd = Math.floor(Math.random() * tdArray.length);
            const randomTableData = tdArray[randomOfTd];
            const squareNumber = Math.floor(Math.random() * 4) + 1;

            let questionArray = [
              "1個前の場所",
              "1個前の数字",
              "2個前の場所",
              "2個前の数字",
            ];
            const hardModeArray = ["3個前の場所", "3個前の数字"];

            let randomQuestion = Math.floor(
              Math.random() * questionArray.length
            );
            let makeQuestion = questionArray[randomQuestion];

            // numberに応じたクラスを設定
            const numberBoxClass = `memory-square__number-box memory-square__number-box--${squareNumber}`;
            squareAppearanceSound.volume = 0.4;
            squareAppearanceSound.play();
            randomTableData.innerHTML = `<div class="${numberBoxClass} fade-in">${squareNumber}</div>`;

            previousTd = randomTableData;
            tableDataArray.push(randomTableData);
            squareArray.push(squareNumber);

            let previousSquareNumber = squareArray[squareArray.length - 2];
            let previousSquareNumber2 = squareArray[squareArray.length - 3];
            let previousSquareNumber3 = squareArray[squareArray.length - 4];

            let previousSquare = tableDataArray[tableDataArray.length - 2];
            let previousSquare2 = tableDataArray[tableDataArray.length - 3];
            let previousSquare3 = tableDataArray[tableDataArray.length - 4];

            i += 1;

            if (i >= 3) {
              questionBox.textContent = makeQuestion;
              questionActive = true;

              waitForAnswer(
                previousSquare,
                previousSquare2,
                previousSquare3,
                previousSquareNumber,
                previousSquareNumber2,
                previousSquareNumber3
              );

              // ハードモードを有効にする条件
              if (
                correctOrWrongArray.length >= 9 &&
                hardModeEnabled === false
              ) {
                hardModeEnabled = true;
                feverSound.volume = 0.4;
                feverSound.play();
                bgmAudio.play();
              }

              // ハードモードが有効な場合の質問設定
              if (hardModeEnabled) {
                questionArray.push(...hardModeArray);
                randomQuestion = Math.floor(
                  Math.random() * questionArray.length
                );
                makeQuestion = questionArray[randomQuestion];
                console.log(questionArray);
                questionBox.textContent = makeQuestion;
                questionActive = true;

                waitForAnswer(
                  previousSquare,
                  previousSquare2,
                  previousSquare3,
                  previousSquareNumber,
                  previousSquareNumber2,
                  previousSquareNumber3
                );
              }
            }

            if (i >= countMax) {
              bgmAudio.pause(); // 再生停止
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

      // 初回実行
      setNewQuestion();

      // setIntervalで繰り返し実行
      const setQuestions = setInterval(
        setNewQuestion,
        hardModeEnabled ? 2000 : 3000
      );
    };
  });

  function updateComboDisplay() {
    let correctComboLength = correctOrWrongArray.length;

    // コンボ数に応じたスコア加算
    if (correctComboLength >= 2 && correctComboLength < 5) {
      memorySquareYourScore += 5;
    } else if (correctComboLength >= 5) {
      memorySquareYourScore += 10;
    }

    if (correctComboLength >= 2 && correctComboLength <= 8) {
      feverTimeText.style.display = "none";
      memorySquareComboContainer.style.display = "flex";
      memorySquareComboCombo.style.display = "block";
      memorySquareComboCount.style.display = "block";
      memorySquareComboCount.textContent = correctComboLength;
    } else if (correctComboLength === 8) {
      feverTimeText.style.display = "flex"; // フォントサイズを30に変更
      memorySquareComboCount.style.display = "none";
      memorySquareComboCombo.style.display = "none";
    } else if (correctComboLength >= 9) {
      console.log("fever!!");
    } else if (correctComboLength === 0) {
      bgmAudio.pause(); // 再生停止
      memorySquareComboContainer.style.display = "none";
    }

    // スコア表示を更新
    yourScoreBox.textContent = memorySquareYourScore;
  }

  // 数字のクリックを待つ関数 (Promiseでクリック待機)
  function waitForUserNumberClick() {
    return new Promise((resolve) => {
      memorySquareNumbers.forEach((number) => {
        number.addEventListener(
          "click",
          () => {
            resolve(number); // クリックされた要素を解決
          },
          { once: true }
        );
      });
    });
  }

  // マスのクリックを待つ関数 (Promiseでクリック待機)
  function waitForUserSquareClick() {
    return new Promise((resolve) => {
      tdArray.forEach((td) => {
        td.addEventListener(
          "click",
          () => {
            resolve(td); // クリックされた要素を解決
          },
          { once: true }
        );
      });
    });
  }

  // ユーザーの数字クリックが正しいか判定する関数
  function checkUserNumberClick(
    clickedNumber,
    previousSquareNumber,
    previousSquareNumber2,
    previousSquareNumber3
  ) {
    if (!questionActive) return;

    if (
      clickedNumber.textContent === String(previousSquareNumber) ||
      clickedNumber.textContent === String(previousSquareNumber2)
    ) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.4;
      correctSound.play();
      memorySquareYourScore += 50;
      if (hardModeEnabled) {
        memorySquareYourScore += 50;
      }
      correctOrWrongArray.push("◯"); // 正解をコンボ配列に追加
      updateComboDisplay(); // 即座にコンボ表示を更新
    } else if (
      questionBox.textContent === "3個前の数字" &&
      clickedNumber.textContent === String(previousSquareNumber3)
    ) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.4;
      correctSound.play();
      memorySquareYourScore += 100;
      if (hardModeEnabled) {
        memorySquareYourScore += 100;
      }
      correctOrWrongArray.push("◯");
      updateComboDisplay();
    } else {
      questionBox.textContent = "×";
      wrongSound.volume = 0.5;
      wrongSound.play();
      correctOrWrongArray = []; // コンボ配列をリセット
      updateComboDisplay();
      hardModeEnabled = false;
    }
    yourScoreBox.textContent = memorySquareYourScore;
    questionActive = false;
  }

  function checkUserSquareClick(
    clickedSquare,
    previousSquare,
    previousSquare2,
    previousSquare3
  ) {
    if (!questionActive) return;

    if (
      (previousSquare && clickedSquare.id === previousSquare.id) ||
      (previousSquare2 && clickedSquare.id === previousSquare2.id)
    ) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.4;
      correctSound.play();
      memorySquareYourScore += 50;
      if (hardModeEnabled) {
        memorySquareYourScore += 50;
      }
      correctOrWrongArray.push("◯");
      updateComboDisplay();
    } else if (
      questionBox.textContent === "3個前の場所" &&
      previousSquare3 &&
      clickedSquare.id === previousSquare3.id
    ) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.4;
      correctSound.play();
      memorySquareYourScore += 100;
      if (hardModeEnabled) {
        memorySquareYourScore += 100;
      }
      correctOrWrongArray.push("◯");
      updateComboDisplay();
    } else {
      questionBox.textContent = "×";
      wrongSound.play();
      correctOrWrongArray = [];
      updateComboDisplay();
      hardModeEnabled = false;
    }
    yourScoreBox.textContent = memorySquareYourScore;
    questionActive = false;
  }

  // 質問への回答を待つ処理 (非同期で数字またはマスのクリックを待つ)
  async function waitForAnswer(
    previousSquare,
    previousSquare2,
    previousSquare3,
    previousSquareNumber,
    previousSquareNumber2,
    previousSquareNumber3
  ) {
    // 数字に関連する質問の場合、数字をハイライト
    if (
      questionBox.textContent === "1個前の数字" ||
      questionBox.textContent === "2個前の数字" ||
      questionBox.textContent === "3個前の数字"
    ) {
      const highlightNumbers = memorySquareNumbers;
      highlightNumbers.forEach((number) => {
        if (number) {
          number.addEventListener("mouseover", () => {
            number.style.border = "3px solid orange";
          });
          number.addEventListener("mouseout", () => {
            number.style.border = "";
          });
        }
      });

      // マスをハイライトしない
      tdArray.forEach((td) => {
        if (td) {
          td.addEventListener("mouseover", () => {
            td.style.border = "";
          });
          td.addEventListener("mouseout", () => {
            td.style.border = "";
          });
        }
      });

      const clickedNumber = await waitForUserNumberClick(); // ユーザーのクリック待ち
      checkUserNumberClick(
        clickedNumber,
        previousSquareNumber,
        previousSquareNumber2,
        previousSquareNumber3
      ); // 判定処理
      questionActive = false; // 質問が終了
    }

    // マスに関連する質問の場合、マスをハイライト
    else if (
      questionBox.textContent === "1個前の場所" ||
      questionBox.textContent === "2個前の場所" ||
      questionBox.textContent === "3個前の場所"
    ) {
      const highlightSquares = tdArray;
      highlightSquares.forEach((td) => {
        if (td) {
          td.addEventListener("mouseover", () => {
            td.style.border = "3px solid orange";
          });
          td.addEventListener("mouseout", () => {
            td.style.border = "";
          });
        }
      });

      // 数字をハイライトしない
      memorySquareNumbers.forEach((number) => {
        if (number) {
          number.addEventListener("mouseover", () => {
            number.style.border = "";
          });
          number.addEventListener("mouseout", () => {
            number.style.border = "";
          });
        }
      });

      const clickedSquare = await waitForUserSquareClick(); // ユーザーのクリック待ち
      checkUserSquareClick(
        clickedSquare,
        previousSquare,
        previousSquare2,
        previousSquare3
      ); // 判定処理
      questionActive = false; // 質問が終了
    }
  }
});
