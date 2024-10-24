<script>
  document.addEventListener('DOMContentLoaded', function() {
    let startTime;
    let timerInterval;

    function startTimer() {
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 10); // 10ミリ秒ごとにタイマーを更新
    }

    function updateTimer() {
      const elapsedTime = Date.now() - startTime;
      const seconds = (elapsedTime / 1000).toFixed(2); // 秒とミリ秒を小数点以下2桁で表示

      document.getElementById("timer").textContent = `${seconds}秒`;
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    function onGameComplete() {
      stopTimer();
      alert("ゲームクリア！おめでとうございます！");
    }

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


    // スタートボタンでタイマーをスタート
    document.getElementById('startButton').addEventListener('click', startTimer);
  });
</script>
  