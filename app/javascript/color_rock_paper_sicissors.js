document.addEventListener("turbo:load", () => {
  // 画像のプリロード用オブジェクト
  const gameImages = {
    // asset-urlヘルパーを使用してパスを生成
    gameEnd: document.querySelector('meta[name="game-end-image"]').content,
    countdown: [
      document.querySelector('meta[name="countdown-3"]').content,
      document.querySelector('meta[name="countdown-2"]').content,
      document.querySelector('meta[name="countdown-1"]').content,
    ],
    computerHands: Array.from(
      { length: 6 },
      (_, i) =>
        document.querySelector(`meta[name="computer-hand-${i + 1}"]`).content
    ),
  };

  // 画像のプリロード処理
  function preloadImages() {
    const imagesToPreload = [
      gameImages.gameEnd,
      ...gameImages.countdown,
      ...gameImages.computerHands,
    ];

    return Promise.all(
      imagesToPreload.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(`Failed to load ${src}`);
          img.src = src;
        });
      })
    );
  }

  // 必要な要素を取得
  const resultFeedback = document.getElementById("result-feedback");
  const gameScreenBase = document.querySelector(".game-page__GameScreenBase");
  const Number_Steps_Max = 6;
  const Number_Steps_Min = 1;
  const rock = document.getElementById("rock_image_id");
  const scissors = document.getElementById("scissors_image_id");
  const paper = document.getElementById("paper_image_id");
  const countdownImageElement = document.getElementById(
    "color_rock_paper_computer_id"
  );
  const gauge = document.getElementById("time-limit_gauge_id");
  const startMessageImage = document.getElementById(
    "game-start-button_image_id"
  );
  const gameStartButton = document.getElementById(
    "color_rock_paper_gameStartButton_id"
  );
  const backTitleButton = document.querySelector(
    ".color_rock_paper_sicissors-BackTitleButton"
  );

  // ゲーム設定
  const totalTimeInSeconds = 30;
  const decreaseRate = 100 / totalTimeInSeconds;
  let color_rock_paper_sicissors_Score = 0;
  const commandContent = document.getElementById(
    "base-color_rock_paper_sicissors-combo-contents_id"
  );
  let commandText = document.querySelector(
    ".color_rock_paper-score_combo_number"
  );
  const commandAddNumberTextContent = document.querySelector(
    ".color_rock_paper-score_combo_add_number"
  );
  let commandAddNumberText = document.getElementById(
    "score_combo_add_number_id"
  );
  const addPoint = 100;
  let commandStartCount = 0;
  let addCommand = 0;

  // オーディオ要素
  const backGroundMusic = document.getElementById("back-bround-music-id");
  const countDownSound = document.getElementById("countDown-id");
  const gameEndSound = document.getElementById("game-End-Sound-id");

  // コンピューターの手の定義
  const computerHands = {
    1: { color: "blue", type: "paper" },
    2: { color: "red", type: "paper" },
    3: { color: "blue", type: "rock" },
    4: { color: "red", type: "rock" },
    5: { color: "blue", type: "scissors" },
    6: { color: "red", type: "scissors" },
  };

  let currentHandNumber =
    Math.floor(Math.random() * (Number_Steps_Max + 1 - Number_Steps_Min)) +
    Number_Steps_Min;

  if (!rock) return null;

  // コンピューターの手を表示する関数（アニメーション付き）
  function displayComputerHand(number) {
    const computerImage = document.getElementById(
      "color_rock_paper_computer_id"
    );
    computerImage.classList.add("icon-transition");
    computerImage.src = gameImages.computerHands[number - 1];

    setTimeout(() => {
      computerImage.classList.remove("icon-transition");
    }, 500);
  }

  // クリックイベントの管理
  function disableClicks() {
    rock.removeEventListener("click", onRockClick);
    scissors.removeEventListener("click", onScissorsClick);
    paper.removeEventListener("click", onPaperClick);
  }

  function enableClicks() {
    rock.addEventListener("click", onRockClick);
    scissors.addEventListener("click", onScissorsClick);
    paper.addEventListener("click", onPaperClick);
  }

  // ボタンクリック時の処理
  function onRockClick() {
    checkResult("rock");
    animateButton(rock);
  }

  function onScissorsClick() {
    checkResult("scissors");
    animateButton(scissors);
  }

  function onPaperClick() {
    checkResult("paper");
    animateButton(paper);
  }

  // ボタンのアニメーション
  function animateButton(button) {
    button.style.transform = "translateY(4px)";
    setTimeout(() => {
      button.style.transform = "translateY(0)";
    }, 100);
  }

  // コンボのアニメーション
  function animateCommand(addComd, comdStart) {
    const movingText = document.getElementById("moving-text");
    movingText.textContent = `+${addComd}`;
    if (comdStart >= 2) {
      commandAddNumberTextContent.style.display = "flex";
      movingText.style.animation = "none";
      void movingText.offsetWidth;
      movingText.style.animation = "moveText 1s ease forwards";
    }
  }

  // カウントダウン処理
  function startCountdown() {
    let countdownIndex = 0;
    commandContent.style.display = "none";
    commandAddNumberTextContent.style.display = "none";

    const countdownInterval = setInterval(() => {
      if (countdownIndex < gameImages.countdown.length) {
        countdownImageElement.style.display = "block";
        countdownImageElement.src = gameImages.countdown[countdownIndex];
        countdownIndex++;
        countDownSound.play();
        countDownSound.volume = 0.4;
      } else {
        countDownSound.pause();
        clearInterval(countdownInterval);
        countdownImageElement.style.display = "block";
        startGame();
      }
    }, 1000);
  }

  // ゲーム開始処理
  function startGame() {
    enableClicks();
    displayComputerHand(currentHandNumber);
    commandContent.style.display = "none";
    commandAddNumberTextContent.style.display = "none";

    let gauge_Initial_value = 100;
    backGroundMusic.loop = true;
    backGroundMusic.play();
    backGroundMusic.volume = 0.4;

    const interval = setInterval(() => {
      gauge_Initial_value -= decreaseRate;
      if (gauge_Initial_value <= 0) {
        gauge_Initial_value = 0;
        clearInterval(interval);
        gameEnd();
        disableClicks();
        backGroundMusic.pause();
        backGroundMusic.currentTime = 0;
      }
      gauge.style.height = gauge_Initial_value + "%";
    }, 1000);
  }

  // 結果判定
  function checkResult(playerHandType) {
    let judgement = "";
    const computerHand = computerHands[currentHandNumber];

    if (computerHand.color === "blue") {
      judgement =
        computerHand.type === playerHandType
          ? "あいこ"
          : (computerHand.type === "rock" && playerHandType === "paper") ||
            (computerHand.type === "scissors" && playerHandType === "rock") ||
            (computerHand.type === "paper" && playerHandType === "scissors")
          ? "勝ち"
          : "負け";
    } else if (computerHand.color === "red") {
      judgement =
        computerHand.type === playerHandType
          ? "あいこ"
          : (computerHand.type === "rock" && playerHandType === "scissors") ||
            (computerHand.type === "scissors" && playerHandType === "paper") ||
            (computerHand.type === "paper" && playerHandType === "rock")
          ? "負け"
          : "勝ち";
    }

    if (
      judgement === "勝ち" ||
      judgement === "負け" ||
      judgement === "あいこ"
    ) {
      if (computerHand.color === "blue") {
        displayFeedback(
          judgement === "勝ち" ? "○" : "×",
          judgement === "勝ち" ? "win" : "lose"
        );
      } else if (computerHand.color === "red") {
        displayFeedback(
          judgement === "負け" ? "○" : "×",
          judgement === "負け" ? "win" : "lose"
        );
      }
    }

    if (
      (computerHand.color === "blue" && judgement === "勝ち") ||
      (computerHand.color === "red" && judgement === "負け")
    ) {
      currentHandNumber =
        Math.floor(Math.random() * (Number_Steps_Max + 1 - Number_Steps_Min)) +
        Number_Steps_Min;
      displayComputerHand(currentHandNumber);

      commandStartCount++;
      if (commandStartCount >= 2) {
        addCommand = addCommand + 10;
        commandContent.style.display = "flex";
        commandText.textContent = commandStartCount;
        animateCommand(addCommand, commandStartCount);
      }

      color_rock_paper_sicissors_Score += addPoint + addCommand;
      document.getElementById("color_rock_paper-score_id").innerText =
        color_rock_paper_sicissors_Score;
      localStorage.setItem(
        "color_rock_paper_sicissors_Score",
        color_rock_paper_sicissors_Score
      );
    } else {
      addCommand = 0;
      commandStartCount = 0;
      commandContent.style.display = "none";
      commandAddNumberTextContent.style.display = "none";
    }
  }

  // フィードバック表示
  function displayFeedback(symbol, type) {
    resultFeedback.textContent = symbol;
    resultFeedback.className = `result-feedback ${type}`;
    resultFeedback.style.display = "block";

    if (symbol === "×") {
      const userInterfaceElement = document.querySelector(
        ".item_user-interface"
      );
      userInterfaceElement.classList.add("flash-red");
      setTimeout(() => {
        userInterfaceElement.classList.remove("flash-red");
      }, 200);
    }

    const winSound = document.getElementById("win-sound");
    const loseSound = document.getElementById("lose-sound");

    if (symbol === "○") {
      if (winSound) {
        winSound.currentTime = 0;
        winSound.play();
      }
    } else if (symbol === "×") {
      if (loseSound) {
        loseSound.currentTime = 0;
        loseSound.play();
      }
    }

    setTimeout(() => {
      resultFeedback.style.display = "none";
    }, 500);
  }

  // ゲーム終了処理
  function gameEnd() {
    const gameEndImageElement = document.getElementById("game-End_Image_Id");
    gameEndImageElement.src = gameImages.gameEnd;
    gameEndImageElement.style.display = "block";
    document.getElementById("color_rock_paper_computer_id").style.display =
      "none";
    localStorage.setItem(
      "color_rock_paper_sicissors_Score",
      color_rock_paper_sicissors_Score
    );
    gameEndSound.play();
    gameEndSound.volume = 0.4;

    setTimeout(() => {
      window.location.href = "/results/color_rock_paper_sicissors";
    }, 3000);
  }

  // ゲーム開始前の設定
  disableClicks();

  // 画像をプリロードしてからゲームを開始可能にする
  preloadImages()
    .then(() => {
      gameStartButton.addEventListener("click", () => {
        backTitleButton.style.opacity = 0;
        backTitleButton.style.cursor = "none";
        backTitleButton.style.pointerEvents = "none";
        backTitleButton.style.display = "none";
        gameStartButton.style.opacity = 0;
        gameStartButton.style.cursor = "none";
        gameStartButton.style.pointerEvents = "none";
        gameStartButton.style.display = "none";
        startMessageImage.style.display = "none";
        startCountdown();
      });
    })
    .catch((error) => {
      console.error("画像のプリロードに失敗しました:", error);
    });
});
