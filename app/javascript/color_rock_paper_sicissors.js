document.addEventListener("turbo:load", () => {
  //相手の手数の最大数
  const Mumber_Steps_Max = 6;
  //相手の手数の最小数
  const Mumber_Steps_Min = 1;
  //グー、チョキ、パーの要素を取得
  const rock                  = document.getElementById("rock_image_id");
  const scissors              = document.getElementById("scissors_image_id");
  const paper                 = document.getElementById("paper_image_id");

  const countdownImageElement = document.getElementById("color_rock_paper_computer_id");
  //制限時間のゲージの要素を取得
  const gauge                = document.getElementById("time-limit_gauge_id");
  const startMessageImage    = document.getElementById("game-start-button_image_id");
  const gameStartButton      = document.getElementById("color_rock_paper_gameStartButton_id");
  //秒数管理
  const totalTimeInSeconds = 30;
  //減少させる割合
  const decreaseRate = 100 / totalTimeInSeconds;
  //スコア
  let color_rock_paper_sicissors_Score = 0;
  //加点するポイント
  const addPoint = 100;
  //連続で正解した時のコンボによる加点点数
  let addComd = 0;
  //ゲームが始まる前に表示するメッセージ
  const gameStartButtonImage = "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/item/startButton.png";
  //「おわり！」の文字画像を格納
  const gameEndImage = "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/item/gameEnd.png";
  //カウントダウンの画像を格納
  const countdownImages = [
    "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/item/number_3.png",
    "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/item/number_2.png",
    "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/item/number_1.png"
  ];
  //コンピューターの色と手を格納
  const computerHands = {
    1: { color: "blue", type: "paper"    }, // computer_1_image.png
    2: { color: "red" , type: "paper"    }, // computer_2_image.png
    3: { color: "blue", type: "rock"     }, // computer_3_image.png
    4: { color: "red" , type: "rock"     }, // computer_4_image.png
    5: { color: "blue", type: "scissors" }, // computer_5_image.png
    6: { color: "red" , type: "scissors" }  // computer_6_image.png
  };
  // 画像番号に基づいて相手の手をランダムに選択する
  let currentHandNumber = Math.floor(Math.random() * (Mumber_Steps_Max+ 1 - Mumber_Steps_Min)) + Mumber_Steps_Min;
  // let imagePath = "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/computer/computer_" + currentHandNumber + "_image.png";
  // document.getElementById("color_rock_paper_computer_id").src = imagePath;  
  function displayComputerHand(number){
    let imagePath = `/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/computer/computer_${number}_image.png`;
    document.getElementById("color_rock_paper_computer_id").src = imagePath;
  }
  // カウントダウンを表示し、終了後にゲームを開始する関数

  // クリックを無効化する関数
  function disableClicks() {
    rock.removeEventListener("click", onRockClick);
    scissors.removeEventListener("click", onScissorsClick);
    paper.removeEventListener("click", onPaperClick);
  }

  // クリックを有効化する関数
  function enableClicks() {
    rock.addEventListener("click", onRockClick);
    scissors.addEventListener("click", onScissorsClick);
    paper.addEventListener("click", onPaperClick);
  }

// 各ボタンのクリック時の関数
function onRockClick() { checkResult("rock"); }
function onScissorsClick() { checkResult("scissors"); }
function onPaperClick() { checkResult("paper"); }
// 初期メッセージの表示
startMessageImage.src = gameStartButtonImage; // 画像パスを設定
startMessageImage.style.display = "block"; // 初期は表示
if (!rock) {
  return null;
}
// カウントダウンを表示し、終了後にゲームを開始する関数
function startCountdown() {
  let countdownIndex = 0;

  const countdownInterval = setInterval(() => {
    if (countdownIndex < countdownImages.length) {
      countdownImageElement.style.display = "block";
      countdownImageElement.src = countdownImages[countdownIndex];
      countdownIndex++;
    } else {
      clearInterval(countdownInterval);
      countdownImageElement.style.display = "block";
      startGame(); // カウントダウン後にゲームを開始
    }
  }, 1000);
}
function startGame(){
  enableClicks(); // ゲーム開始時にクリックを有効化
  displayComputerHand(currentHandNumber); // コンピューターの手を表示
   //制限時間の初期値
   let gauge_Initial_value = 100;
   const interval = setInterval(function(){
     gauge_Initial_value -= decreaseRate;
     if(gauge_Initial_value <= 0){
       gauge_Initial_value = 0;
       clearInterval(interval);
       gameEnd();
       disableClicks();
     }
     gauge.style.height = gauge_Initial_value + '%';
   }, 1000);
}
function checkResult(playerHandType) {
  let judgement = '';
  const computerHand = computerHands[currentHandNumber];
  if (computerHand.color === "blue") {
    judgement = (computerHand.type === playerHandType) ? "あいこ" :
                ((computerHand.type === "rock" && playerHandType === "paper") || 
                 (computerHand.type === "scissors" && playerHandType === "rock") || 
                 (computerHand.type === "paper" && playerHandType === "scissors")) ? "勝ち" : "負け";
  } else if (computerHand.color === "red") {
    judgement = (computerHand.type === playerHandType) ? "あいこ" :
                ((computerHand.type === "rock" && playerHandType === "scissors") ||
                 (computerHand.type === "scissors" && playerHandType === "paper") ||
                 (computerHand.type === "paper" && playerHandType === "rock")) ? "負け" : "勝ち";
  }
  console.log(judgement);
  console.log(currentHandNumber, computerHand.type, computerHand.color);
  if (computerHand.color === "blue" && judgement === "勝ち" || computerHand.color === "red" &&  judgement === "負け"){
    currentHandNumber = Math.floor(Math.random() * (Mumber_Steps_Max + 1 - Mumber_Steps_Min)) + Mumber_Steps_Min;
    const newComputerHand = computerHands[currentHandNumber];
    displayComputerHand(currentHandNumber);
    console.log(currentHandNumber, newComputerHand.type, newComputerHand.color);
    addComd = addComd + 10;
    color_rock_paper_sicissors_Score += addPoint + addComd;
    document.getElementById("score_id").innerText = color_rock_paper_sicissors_Score;
    localStorage.setItem("color_rock_paper_sicissors_Score", color_rock_paper_sicissors_Score);
    console.log(color_rock_paper_sicissors_Score);
    console.log("保存されたスコア:", localStorage.getItem("color_rock_paper_sicissors_Score"));
  }else{
    addComd = 0;
  }
}
function addCircleToComputerHand(playerHandType) {
  const computerImage = document.getElementById(playerHandType);
  computerImage.style.border = "5px solid red";  // 丸を付けるためのスタイル
  setTimeout(() => {
    computerImage.style.border = "";  // 丸を消す
  }, 1000);
}
//ゲームが終わった時のメッセージ
function  gameEnd(){
  const gameEndImageElement = document.getElementById("game-End_Image_Id");
  gameEndImageElement.src = gameEndImage; // 画像のパスを設定
  gameEndImageElement.style.display = "block"; // 画像を表示
  document.getElementById("color_rock_paper_computer_id").style.display = "none";
  localStorage.setItem("color_rock_paper_sicissors_Score", color_rock_paper_sicissors_Score);
  setTimeout(() => {
    window.location.href = '/results/color_rock_paper_sicissors'; // リザルト画面のパスに置き換えてください
  }, 3000);
}
//スコア
// function gameScoreSave() {
//   fetch('/results/color_rock_paper_sicissors', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
//     },
//     body: JSON.stringify({
//       color_rock_paper_sicissor: {  
//         name: "ユーザー名",
//         score: score
//       }
//     })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("サーバーエラー");
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("保存成功:", data);
//   })
//   .catch(error => {
//     console.error("エラー:", error);
//   });
// }
disableClicks(); // ゲームが開始されるまではクリックを無効化
  gameStartButton.addEventListener("click", () => {
    startMessageImage.style.display = "none"; // スタートボタンが押されたら非表示に
    startCountdown(); // カウントダウン開始
  });
});