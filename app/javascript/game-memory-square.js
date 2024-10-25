document.addEventListener("turbo:load", () => {
  // ゲームに関連する要素を取得
  const gameStartButton = document.getElementById("memory-square__game-start-button");
  const questionBox = document.querySelector(".memory-square__question-box");
  const gameScreen = document.querySelector(".memory-square__game-screen");
  const upperContainer = document.querySelector(".memory-square__upper-container");
  const middleContainer = document.querySelector(".memory-square__middle-container");
  const lowerContainer = document.querySelector(".memory-square__lower-container");
  const memorySquareTable = document.querySelector(".memory-square__table");
  const memorySquareNumbers = document.querySelectorAll(".memory-square__number-table td");

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

  if (!memorySquareTable || !questionBox) { return null; }  // テーブルや質問ボックスが無い場合は終了

  const tableDataArray = [];  // 各ターンでクリックされたマスを記録
  const squareArray = [];     // 各ターンで表示された数字を記録
  let memorySquareYourScore = 0;          // スコアを記録
  let i = 0;                  // ゲームのターン数をカウント
  let timeLimit = 60;         // ゲームの制限時間
  const countMax = 30;        // 質問を出す最大ターン数
  let previousTd = null;      // 1つ前のマスを記録
  let questionActive = false; // 質問がアクティブかどうかのフラグ

  // ゲームスタートボタンをクリックした際の処理
  gameStartButton.addEventListener('click', () => {
    gameStartButton.style.opacity = 0;            // ボタンを非表示に
    gameStartButton.style.cursor = "none";        // ボタンのカーソルを無効に
    gameStartButton.style.pointerEvents = "none"; // クリック無効化

    // 1秒ごとに時間を減らす処理
    window.setInterval(function() {
      if(timeLimit > 0){
        timeLimit -= 1;
      }
    
      // 時間切れ時の処理
      if (timeLimit === 0) {
        upperContainer.style.display = "none";
        middleContainer.style.display = "none";
        lowerContainer.style.display = "none";
        gameScreen.innerHTML = `<div class="memory-square__the-end">Time up!!</div>`;
    
        // ゲーム終了時にローカルストレージにスコアを保存
        localStorage.setItem('memorySquareYourScore', memorySquareYourScore);  // 文字列のキーを指定

        // 結果ページに遷移
        setTimeout(() => {
          window.location.href = `/results/memory_square`;
        }, 2000);
      }
    }, 1000);
    

    // 新しい質問を設定する処理を開始
    const setQuestions = setInterval(() => {
      // 前回のマスの数字を非表示にし、フェードアウトアニメーション
      if (previousTd) {
        const previousNumberBox = previousTd.querySelector('.memory-square__number-box');
        if (previousNumberBox) {
          previousNumberBox.classList.remove('fade-in');
          previousNumberBox.classList.add('fade-out');

          setTimeout(() => {
            previousTd.innerHTML = "";
          }, 250);
        }
      }

      // 質問がアクティブでない場合のみ新しい質問を設定
      if (!questionActive) {
        setTimeout(() => {
          const randomOfTd = Math.floor(Math.random() * tdArray.length); // ランダムにマスを選択
          const randomTableData = tdArray[randomOfTd];
          const squareNumber = Math.floor(Math.random() * 4) + 1;        // ランダムな数字を選択

          const questionArray = ["1個前の場所", "1個前の数字", "2個前の場所", "2個前の数字"]; // 質問の種類
          const randomQuestion = Math.floor(Math.random() * questionArray.length);
          const makeQuestion = questionArray[randomQuestion];

          randomTableData.innerHTML = `<div class="memory-square__number-box fade-in">${squareNumber}</div>`;
          previousTd = randomTableData;  // 前回のマスとして記録

          tableDataArray.push(randomTableData); // 表示されたマスと数字を記録
          squareArray.push(squareNumber);
          let previousSquareNumber = squareArray[squareArray.length - 2];   // 1つ前の数字
          let previousSquareNumber2 = squareArray[squareArray.length - 3];  // 2つ前の数字

          let previousSquare = tableDataArray[tableDataArray.length - 2];   // 1つ前のマス
          let previousSquare2 = tableDataArray[tableDataArray.length - 3];  // 2つ前のマス

          i += 1;  // ターン数を増やす

          // ターン数が3以上の場合、質問を表示
          if (i >= 3) {
            questionBox.textContent = makeQuestion;
            questionActive = true; // 質問がアクティブであることを示すフラグを設定
            waitForAnswer(previousSquare, previousSquare2, previousSquareNumber, previousSquareNumber2); // 質問に対する回答待ち
          }

          // 最大ターン数に達したら質問を終了
          if (i >= countMax) {
            clearInterval(setQuestions);
            questionBox.textContent = makeQuestion;
            questionActive = true; // 質問がアクティブであることを示すフラグを設定
          }
        }, 500);
      }
    }, 3000);  // 3秒ごとに新しい質問を設定
  });

  // 数字のクリックを待つ関数 (Promiseでクリック待機)
  function waitForUserNumberClick() {
    return new Promise((resolve) => {
      memorySquareNumbers.forEach(number => {
        number.addEventListener('click', () => {
          resolve(number);  // クリックされた要素を解決
        }, { once: true });
      });
    });
  }

  // マスのクリックを待つ関数 (Promiseでクリック待機)
  function waitForUserSquareClick() {
    return new Promise((resolve) => {
      tdArray.forEach(td => {
        td.addEventListener('click', () => {
          resolve(td);  // クリックされた要素を解決
        }, { once: true });
      });
    });
  }

  // ユーザーの数字クリックが正しいか判定する関数
  function checkUserNumberClick(clickedNumber, previousSquareNumber, previousSquareNumber2) {
    if (clickedNumber.textContent === String(previousSquareNumber) || clickedNumber.textContent === String(previousSquareNumber2)) {
      questionBox.textContent = "◯";  // 正解
      memorySquareYourScore += 50;                // スコア加算
      yourScoreBox.textContent = memorySquareYourScore;
    } else {
      questionBox.textContent = "×";  // 不正解
    }
  }

  // ユーザーのマスクリックが正しいか判定する関数
  function checkUserSquareClick(clickedSquare, previousSquare, previousSquare2) {
    if (clickedSquare.id === previousSquare.id || clickedSquare.id === previousSquare2.id) {
      questionBox.textContent = "◯";  // 正解
      memorySquareYourScore += 50;                // スコア加算
      yourScoreBox.textContent = memorySquareYourScore;
    } else {
      questionBox.textContent = "×";  // 不正解
    }
  }

  // 質問への回答を待つ処理 (非同期で数字またはマスのクリックを待つ)
  async function waitForAnswer(previousSquare, previousSquare2, previousSquareNumber, previousSquareNumber2) {
    console.log(questionBox.textContent);
    // 数字に関連する質問の場合、数字をハイライト
    if (questionBox.textContent === "1個前の数字" || questionBox.textContent === "2個前の数字") {
      const highlightNumbers = memorySquareNumbers;
      highlightNumbers.forEach(number => {
        if (number) {
          number.addEventListener('mouseover', () => {
            number.style.border = "2px solid orange";
          });
          number.addEventListener("mouseout", () => {
            number.style.border = "2px solid white";
          }
        )};
      });

      tdArray.forEach(td => {
        if (td) {
          td.addEventListener('mouseover', () => {
            td.style.border = "";
          });
          td.addEventListener("mouseout", () => {
            td.style.border = "";
          }
        )};
      });

      const clickedNumber = await waitForUserNumberClick();  // ユーザーのクリック待ち
      checkUserNumberClick(clickedNumber, previousSquareNumber, previousSquareNumber2);  // 判定処理
      questionActive = false;  // 質問が終了
    }

    // マスに関連する質問の場合、マスをハイライト
    else if (questionBox.textContent === "1個前の場所" || questionBox.textContent === "2個前の場所") {
      const highlightSquares = tdArray;
      highlightSquares.forEach(td => {
        if (td) {
          td.addEventListener('mouseover', () => {
            td.style.border = "2px solid orange";
          });
          td.addEventListener("mouseout", () => {
            td.style.border = "2px solid white";
          }
        )};
      });

      memorySquareNumbers.forEach(number => {
        if (number) {
          number.addEventListener('mouseover', () => {
            number.style.border = "";
          });
          number.addEventListener("mouseout", () => {
            number.style.border = "";
          }
        )};
      });

      const clickedSquare = await waitForUserSquareClick();  // ユーザーのクリック待ち
      checkUserSquareClick(clickedSquare, previousSquare, previousSquare2);  // 判定処理
      questionActive = false;  // 質問が終了
    }
  }
});
