document.addEventListener("turbo:load", () => {
  // ゲームに関連する要素を取得
  const gameStartButton = document.getElementById(
    "memory-square__game-start-button"
  );
  const backTitleButton = document.querySelector(
    ".memory-square__BackTitleButton"
  );

  const countdownSound = document.getElementById(
    "memory-square__countdown-sound"
  );
  const correctSound = document.getElementById("memory-square__correct-sound");
  const wrongSound = document.getElementById("memory-square__wrong-sound");
  const squareAppearanceSound = document.getElementById(
    "memory-square__square-appearance-sound"
  );
  const feverSound = document.getElementById("memory-square__fever-sound");
  const feverVoice = document.getElementById("memory-square__fever-voice");
  const endSound = document.getElementById("memory-square__end-sound");
  const bgmAudio = document.getElementById("memory-square__bgm-audio");
  const feverBgm = document.getElementById("memory-square__fever-bgm");

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
    countdownSound.volume = 0.3;
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

    const startGame = () => {
      bgmAudio.volume = 0.2;
      bgmAudio.play();
      upperContainer.style.display = "flex";
      middleContainer.style.display = "flex";
      lowerContainer.style.display = "flex";
      const interval = 100;
      const decrement = 1 / (1000 / interval);

      const gameTimer = window.setInterval(function () {
        if (timeLimit > 0) {
          // フィーバーモードの判定を先に行う
          if (correctOrWrongArray.length >= 9) {
            hardModeEnabled = true;
          }

          if (!hardModeEnabled) {
            timeLimit = Math.max(0, timeLimit - decrement);
            const progressPercentage = (1 - timeLimit / totalGameTime) * 360;
            memorySquareCountCircle.style.background = `conic-gradient( rgb(148, 148, 148) ${progressPercentage}deg, rgba(69, 69, 69, 0.846) ${progressPercentage}deg)`;
            memorySquareCount.textContent = Math.floor(timeLimit);
          } else {
            if (feverCount > 0) {
              feverCount -= 1;
              if (feverCount === 0) {
                timeLimit = Math.max(0, timeLimit - 1);
                hardModeEnabled = false;
                feverCount = 300;
                feverTimeText.style.display = "none";
                memorySquareTable.classList.remove("fever-mode");
                gameScreen.classList.remove("fever-background");
                correctOrWrongArray.length = 0;
                feverBgm.pause();
              }
            }
          }
        } else {
          memorySquareTable.classList.remove("fever-mode");
          bgmAudio.pause();
          endSound.volume = 0.3;
          endSound.play();

          clearInterval(gameTimer);
          upperContainer.style.display = "none";
          middleContainer.style.display = "none";
          lowerContainer.style.display = "none";
          gameScreen.innerHTML = `<div class="memory-square__the-end">Time up!!</div>`;
          memorySquareCountCircle.style.background = `conic-gradient(#232323 360deg, #232323 0deg)`;

          localStorage.setItem("memorySquareYourScore", memorySquareYourScore);
          setTimeout(() => {
            window.location.href = `/results/memory_square`;
          }, 4000);
        }
      }, interval);

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

            if (hardModeEnabled) {
              questionArray = [...questionArray, ...hardModeArray];
            }
            let randomQuestion = Math.floor(
              Math.random() * questionArray.length
            );
            let makeQuestion = questionArray[randomQuestion];

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

            if (i >= countMax) {
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

      setNewQuestion();

      const setQuestions = setInterval(
        setNewQuestion,
        hardModeEnabled ? 2000 : 3000
      );
    };
  });

  function updateComboDisplay() {
    let correctComboLength = correctOrWrongArray.length;

    if (correctComboLength >= 2 && correctComboLength < 5) {
      memorySquareYourScore += 5;
    } else if (correctComboLength >= 5 && correctComboLength < 10) {
      memorySquareYourScore += 10;
    } else if (correctComboLength >= 10 && correctComboLength < 18) {
      memorySquareYourScore += 15;
    } else if (correctComboLength >= 18) {
      memorySquareYourScore += 20;
    }

    if (correctComboLength >= 2 && correctComboLength <= 8) {
      feverTimeText.style.display = "none";
      memorySquareComboContainer.style.display = "flex";
      memorySquareComboCombo.style.display = "block";
      memorySquareComboCount.style.display = "block";
      memorySquareComboCount.textContent = correctComboLength;
    } else if (correctComboLength === 9) {
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
      memorySquareTable.classList.remove("fever-mode");
      gameScreen.classList.remove("fever-background");
      feverBgm.pause();
      bgmAudio.volume = 0.2;
      bgmAudio.play();
      memorySquareComboContainer.style.display = "none";
    }

    yourScoreBox.textContent = memorySquareYourScore;
  }

  function waitForUserNumberClick() {
    return new Promise((resolve) => {
      const clickHandler = (number) => {
        memorySquareNumbers.forEach((n) => {
          n.removeEventListener("click", clickHandlers.get(n));
        });
        resolve(number);
      };

      const clickHandlers = new Map();
      memorySquareNumbers.forEach((number) => {
        const handler = () => clickHandler(number);
        clickHandlers.set(number, handler);
        number.addEventListener("click", handler);
      });
    });
  }

  function waitForUserSquareClick() {
    return new Promise((resolve) => {
      const clickHandler = (td) => {
        tdArray.forEach((t) => {
          t.removeEventListener("click", clickHandlers.get(t));
        });
        resolve(td);
      };

      const clickHandlers = new Map();
      tdArray.forEach((td) => {
        const handler = () => clickHandler(td);
        clickHandlers.set(td, handler);
        td.addEventListener("click", handler);
      });
    });
  }

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

    if (isCorrect) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.2;
      correctSound.play();
      memorySquareYourScore += scoreIncrement * (hardModeEnabled ? 2 : 1);
      correctOrWrongArray.push("◯");
    } else {
      questionBox.textContent = "×";
      wrongSound.volume = 0.2;
      wrongSound.play();
      correctOrWrongArray = [];
      hardModeEnabled = false;
    }

    updateComboDisplay();
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

    let isCorrect = false;
    let scoreIncrement = 0;

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

    if (isCorrect) {
      questionBox.textContent = "◯";
      correctSound.volume = 0.2;
      correctSound.play();
      memorySquareYourScore += scoreIncrement * (hardModeEnabled ? 2 : 1);
      correctOrWrongArray.push("◯");
    } else {
      questionBox.textContent = "×";
      wrongSound.volume = 0.2;
      wrongSound.play();
      correctOrWrongArray = [];
      hardModeEnabled = false;
    }

    updateComboDisplay();
    yourScoreBox.textContent = memorySquareYourScore;
    questionActive = false;
  }

  async function waitForAnswer(
    previousSquare,
    previousSquare2,
    previousSquare3,
    previousSquareNumber,
    previousSquareNumber2,
    previousSquareNumber3
  ) {
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

    // 質問のタイプに基づいて明示的に要素を選択
    if (isNumberQuestion) {
      highlightElements = memorySquareNumbers;
      nonHighlightElements = tdArray;
    } else if (isSquareQuestion) {
      highlightElements = tdArray;
      nonHighlightElements = memorySquareNumbers;
    } else {
      // 予期しない質問タイプの場合のフォールバック
      console.warn("Unexpected question type:", currentQuestion);
      highlightElements = [];
      nonHighlightElements = [];
    }

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

    if (isNumberQuestion) {
      const clickedNumber = await waitForUserNumberClick();
      checkUserNumberClick(
        clickedNumber,
        previousSquareNumber,
        previousSquareNumber2,
        previousSquareNumber3
      );
    } else if (isSquareQuestion) {
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
