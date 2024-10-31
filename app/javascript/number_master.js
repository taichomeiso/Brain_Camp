document.addEventListener("turbo:load", () => {
  let timer = 0;
  let timerInterval;
  let gameStarted = false;
  const grid = [...Array(4)].map(() => Array(4).fill(null));
  let activeCell = null;

  function updateTimer() {
    timer += 10;
    const totalSeconds = Math.floor(timer / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = (timer % 1000).toString().padStart(3, '0').slice(0, 2);
    document.getElementById("timer").innerText = `${minutes}:${seconds}.${milliseconds}秒`;
  }

  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      timer = 0;
      document.getElementById("timer").innerText = "00:00.00秒";
      timerInterval = setInterval(updateTimer, 10);
    }
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

  function checkCompletion() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!grid[i][j]) return false; // 空のセルがある場合、未完成
      }
    }
    clearInterval(timerInterval); // すべてのマスが埋まったらタイマーを停止
    alert("おめでとうございます！ゲームクリアです！");
    return true;
  }

  document.getElementById("startButton").addEventListener("click", () => {
    grid.forEach((row, rowIndex) => row.forEach((_, colIndex) => grid[rowIndex][colIndex] = 0));
    document.querySelectorAll(".sudoku-cell").forEach(cell => {
      cell.value = '';
      cell.disabled = false;
    });
    setHints(); // スタートと同時にヒントを出す
    startGame();
  });

  window.setNumber = function(num) {
    if (!activeCell) {
      console.error("セルが無効です。アクティブなセルが選択されていません。");
      return;
    }

    const row = activeCell.parentElement.parentElement.rowIndex;
    const col = activeCell.parentElement.cellIndex;

    if (isValidMove(row, col, num)) {
      activeCell.value = num;
      grid[row][col] = num;
      if (checkCompletion()) {
        clearInterval(timerInterval);
      }
    } else {
      alert("重複しています！");
    }
  };

  document.querySelectorAll(".sudoku-cell").forEach(cell => {
    cell.addEventListener('click', () => {
      activeCell = cell;
      cell.focus();
      console.log("アクティブなセルが設定されました。", activeCell);
    });


    // キーボード入力を無効化
    cell.setAttribute('readonly', true);
  });


  document.querySelectorAll('.number-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const number = event.target.innerText;
      setNumber(parseInt(number));
    });
  });
});
