document.addEventListener("turbo:load", () => {
  let timer = 0;
  let timerInterval;
  let gameStarted = false;
  const grid = [...Array(4)].map(() => Array(4).fill(null));
  let activeCell = null;


  const startButton = document.getElementById("startButton");
  const backButton = document.querySelector(".game-page__BackTitleButton");

  const fireworksSound = new Audio("/assets/number_master/fireworks2.mp3");
  const correct_answerSound = new Audio("/assets/number_master/correct-answer.mp3");
  const Incorrect_answerSound = new Audio("/assets/number_master/Incorrect-answer.mp3");
  const game_page_bgmSound = new Audio("/assets/number_master/game_page_bgm.mp3");


  // カウントダウン用の要素を作成
  const countdownElement = document.createElement("div");
  countdownElement.style.position = "fixed";
  countdownElement.style.top = "50%";
  countdownElement.style.left = "50%";
  countdownElement.style.transform = "translate(-50%, -50%)";
  countdownElement.style.fontSize = "15rem";// フォントサイズ
  countdownElement.style.fontWeight = "bold";// フォントの太さ
  countdownElement.style.color = "#000"; // 文字色
  countdownElement.style.zIndex = "999"; // 他の要素より前面に表示
  countdownElement.style.transition = "opacity 1s"; // アニメーション（不透明度の変化）
  document.body.appendChild(countdownElement);

  function updateTimer() {
    timer += 10;
    const totalSeconds = Math.floor(timer / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = (timer % 1000).toString().padStart(3, '0').slice(0, 2);
    document.getElementById("number_master_timer").innerText = `${minutes}:${seconds}.${milliseconds}秒`;
  }

  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      timer = 0;
      document.getElementById("number_master_timer").innerText = "00:00.00秒";
      timerInterval = setInterval(updateTimer, 10);
    }

    // BGMを再生
    game_page_bgmSound.loop = true; // ループを設定
    game_page_bgmSound.play();      // BGMを再生
    game_page_bgmSound.volume = 0.3; // 音量を設定

    // スタートボタンを非表示にする
    startButton.classList.add("hidden-opacity");
    backButton.classList.add("hidden-opacity");

  }

  // クエリパラメータからゲームタイムを取得
  const urlParams = new URLSearchParams(window.location.search);
  const gameTime = urlParams.get("game_time");

  // ゲームタイムを表示する要素にセット
  if (gameTime) {
    const gameTimeElement = document.querySelector(".gameTime");
    if (gameTimeElement) {
      gameTimeElement.innerText = ` ${gameTime}秒`;
    }
  }


  function stopBGM() {
    // ゲーム終了時にBGMを停止
    game_page_bgmSound.pause();  // 再生を停止
    game_page_bgmSound.currentTime = 0; // 再生位置をリセット
  }


  function showMessage(text, type = "success") {
    const messageDiv = document.createElement("div");
    messageDiv.innerText = text;
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "20px";
    messageDiv.style.left = "50%";
    messageDiv.style.transform = "translateX(-50%)";
    messageDiv.style.padding = "15px 30px";
    messageDiv.style.borderRadius = "8px";
    messageDiv.style.color = "#fff";
    messageDiv.style.fontSize = "1.2rem";
    messageDiv.style.zIndex = 1000;
    messageDiv.style.transition = "opacity 0.5s ease";

    if (type === "error") {
      messageDiv.style.backgroundColor = "#e74c3c"; // エラーメッセージ用の赤色
    } else {
      messageDiv.style.backgroundColor = "#2ecc71"; // 成功メッセージ用の緑色
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 500);
    }, 3000);
  }

  function isValidMove(row, col, num) {
    for (let i = 0; i < 4; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 2) * 2;
    const startCol = Math.floor(col / 2) * 2;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (grid[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }

  function generateValidSudokuGrid() {
    const baseGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ];

    for (let i = 0; i < 4; i += 2) {
      if (Math.random() > 0.5) {
        [baseGrid[i], baseGrid[i + 1]] = [baseGrid[i + 1], baseGrid[i]];
      }
      if (Math.random() > 0.5) {
        for (let row = 0; row < 4; row++) {
          [baseGrid[row][i], baseGrid[row][i + 1]] = [baseGrid[row][i + 1], baseGrid[row][i]];
        }
      }
    }
    return baseGrid;
  }

  function setHints() {
    const sudokuGrid = generateValidSudokuGrid();
    let hints = 0;

    while (hints < 6) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);

      if (!grid[row][col]) {
        grid[row][col] = sudokuGrid[row][col];
        const cell = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1}) input`);
        cell.value = sudokuGrid[row][col];
        cell.disabled = true;
        hints++;
      }
    }
  }

  function showFireworks() {
    const fireworkCount = 20; // 花火の数
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.pointerEvents = 'none';
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < fireworkCount; i++) {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      firework.style.width = '15px';
      firework.style.height = '15px';
      firework.style.position = 'absolute';
      firework.style.top = `${Math.random() * window.innerHeight}px`;
      firework.style.left = `${Math.random() * window.innerWidth}px`;
      firework.style.opacity = '1';

      fireworksContainer.appendChild(firework);

      // 花火のアニメーション
      setTimeout(() => {
        firework.style.transform = 'scale(20)';
        firework.style.opacity = '0';
      }, 100);

      // 花火を消す
      setTimeout(() => {
        fireworksContainer.removeChild(firework);
      }, 1000);
    }

    // コンテナも後で削除
    setTimeout(() => {
      document.body.removeChild(fireworksContainer);
    }, 3000);
  }

  function checkCompletion() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!grid[i][j]) return false;
      }
    }
    clearInterval(timerInterval);
    showFireworks(); // ゲームクリア時に花火を表示
    showMessage("🎉 おめでとうございます！ゲームクリアです！ 🎉", "success");

    // ゲームタイムを取得
    const totalSeconds = Math.floor(timer / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = (timer % 1000).toString().padStart(3, '0').slice(0, 2);
    const gameTime = `${minutes}:${seconds}.${milliseconds}`;

    // リザルト画面へゲームタイムをクエリパラメータで渡す
    setTimeout(() => {
      window.location.href = `/results/number_master?game_time=${encodeURIComponent(gameTime)}`;
    }, 3500); // メッセージの表示時間と合わせる

    // BGM停止
    stopBGM();

    return true;
  }


  function startCountdown() {
    let countdown = 3;
    countdownElement.innerText = countdown;
    countdownElement.style.opacity = "1"; // カウントダウンを表示

    const countdownInterval = setInterval(() => {
      countdown--;
      countdownElement.innerText = countdown;
      if (countdown === 0) {
        clearInterval(countdownInterval); // カウントダウン終了
        countdownElement.style.opacity = "0"; // カウントダウンを非表示
        setTimeout(() => {
          countdownElement.style.display = "none"; // カウントダウン要素を完全に非表示に
        }, 1000); // フェードアウト後に非表示
        startGame(); // ゲームを開始
      }
    }, 1000); // 1秒ごとにカウントダウン

    // カウントダウン終了後、スタートする
  }


  document.getElementById("startButton").addEventListener("click", () => {
    grid.forEach((row, rowIndex) => row.forEach((_, colIndex) => grid[rowIndex][colIndex] = 0));
    document.querySelectorAll(".sudoku-cell").forEach(cell => {
      cell.value = '';
      cell.disabled = false;
    });
    setHints();
    // startGame();
    // カウントダウン開始
    startCountdown();
  });

  window.setNumber = function (num) {
    if (!activeCell) {
      console.error("セルが無効です。アクティブなセルが選択されていません。");
      return;
    }

    const row = activeCell.parentElement.parentElement.rowIndex;
    const col = activeCell.parentElement.cellIndex;

    if (isValidMove(row, col, num)) {
      activeCell.value = num;
      grid[row][col] = num;


      // 正解の場合に音を鳴らす
      correct_answerSound.currentTime = 0; // 再生位置をリセット
      correct_answerSound.play();          // 正解音を再生
      correct_answerSound.volume = 1.0; // 音量を設定

      if (checkCompletion()) {
        clearInterval(timerInterval);
      }
    } else {
      // 不正解の場合に音を鳴らす
      Incorrect_answerSound.currentTime = 0; // 再生位置をリセット
      Incorrect_answerSound.play();          // 不正解音を再生
      Incorrect_answerSound.volume = 1.0; // 音量を設定
      showMessage("重複しています！別の数字を選んでください。", "error");
    }
  };


  document.querySelectorAll(".sudoku-cell").forEach(cell => {
    cell.addEventListener('click', () => {
      // 前のアクティブセルのスタイルをリセット
      if (activeCell) {
        activeCell.style.backgroundColor = ""; // 以前選ばれていたセルの背景色をリセット
      }

      // 新しいアクティブセルのスタイルを変更
      activeCell = cell;
      cell.focus();
      cell.style.backgroundColor = "lightblue"; // アクティブなセルに背景色を追加
      console.log("アクティブなセルが設定されました。", activeCell);
    });
    cell.setAttribute('readonly', true);
  });

  document.querySelectorAll('.number-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const number = event.target.innerText;

      // 「消す」ボタンが押された場合の処理
      if (numberText === "消す") {
        if (activeCell) {
          activeCell.value = ""; // アクティブなセルの値を空にする
          const row = activeCell.parentElement.parentElement.rowIndex;
          const col = activeCell.parentElement.cellIndex;
          grid[row][col] = null; // グリッド配列も空にする
        }
      } else {
        // 数字ボタンが押された場合のみsetNumberを呼び出す
        const number = parseInt(numberText);
        if (!isNaN(number)) {
          setNumber(number);
        }
      }
    });
  });

});
