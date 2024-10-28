let timer = 0; // ミリ秒で計測
let timerInterval;
let gameStarted = false;

// タイマーを更新する関数
function updateTimer() {
  timer += 10; // 10ミリ秒ごとに更新
  const totalSeconds = Math.floor(timer / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = (timer % 1000).toString().padStart(3, '0').slice(0, 2); // ミリ秒を2桁にする

  document.getElementById("timer").innerText = `${minutes}:${seconds}.${milliseconds}秒`;
}

// ゲームのスタート関数
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    timer = 0;
    document.getElementById("timer").innerText = "00:00.00秒"; // タイマーの初期値を設定
    timerInterval = setInterval(updateTimer, 10); // 100ミリ秒ごとに呼び出し
  }
}

// ゲームの終了関数
function stopGame() {
  clearInterval(timerInterval);
  gameStarted = false;
  const finalTime = (timer / 1000).toFixed(2);
  alert(`ゲームクリア！タイム: ${finalTime}秒`);
}

// すべてのマスが埋まっているかをチェックする関数
function checkAllCellsFilled() {
  const cells = document.querySelectorAll(".sudoku-cell");
  return Array.from(cells).every(cell => cell.value.trim() !== "");
}

// マスに変更があった場合のイベントリスナーを追加
document.querySelectorAll(".sudoku-cell").forEach(cell => {
  cell.addEventListener("input", () => {
    if (checkAllCellsFilled()) {
      stopGame();
    }
  });
});

// スタートボタンのクリックイベント
document.getElementById("startButton").addEventListener("click", startGame);



let selectedInput = null;

// クリックされたマスを記録
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('click', function() {
    selectedInput = this;
  });
});

// ボタンで選択された数字を入力する
window.setNumber = function (number) {
  if (selectedInput) {
    selectedInput.value = number;
  }
};


    
    
 

  