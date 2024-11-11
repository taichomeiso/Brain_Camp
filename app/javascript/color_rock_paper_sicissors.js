document.addEventListener("turbo:load", () => {
  // 必要な要素を取得
 const resultFeedback = document.getElementById("result-feedback");
 const gameScreenBase = document.querySelector(".game-page__GameScreenBase");
 //相手の手数の最大数
 const Number_Steps_Max = 6;
 //相手の手数の最小数
 const Number_Steps_Min = 1;
 //グー、チョキ、パーの要素を取得
 const rock                  = document.getElementById("rock_image_id");
 const scissors              = document.getElementById("scissors_image_id");
 const paper                 = document.getElementById("paper_image_id");

 const countdownImageElement = document.getElementById("color_rock_paper_computer_id");
 //制限時間のゲージの要素を取得
 const gauge                = document.getElementById("time-limit_gauge_id");
 const startMessageImage    = document.getElementById("game-start-button_image_id");
 const gameStartButton      = document.getElementById("color_rock_paper_gameStartButton_id");
 const backTitleButton      = document.querySelector(".game-page__BackTitleButton");
 //秒数管理
 const totalTimeInSeconds = 30;
 //減少させる割合
 const decreaseRate = 100 / totalTimeInSeconds;
 //スコア
 let color_rock_paper_sicissors_Score = 0;
 //加点するポイント
 const addPoint = 100;
 //コンボが始まるカウント
 let commandStartCount = 0;
 //連続で正解した時のコンボによる加点点数
 let addCommand = 0;
 //バックグラウンドミュージック
 const backGroundMusic = document.getElementById("back-bround-music-id");
 const countDownSound  = document.getElementById("countDown-id");
 const gameEndSound    = document.getElementById("game-End-Sound-id");
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
 let currentHandNumber = Math.floor(Math.random() * (Number_Steps_Max+ 1 - Number_Steps_Min)) + Number_Steps_Min;
 // let imagePath = "/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/computer/computer_" + currentHandNumber + "_image.png";
 // document.getElementById("color_rock_paper_computer_id").src = imagePath;  
 function displayComputerHand(number){
    // let imagePath = `/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/computer/computer_${number}_image.png`;
    // document.getElementById("color_rock_paper_computer_id").src = imagePath;
    const computerImage = document.getElementById("color_rock_paper_computer_id");
 
    // アニメーションクラスを一時的に追加してアイコンが切り替わる演出を作成
    computerImage.classList.add("icon-transition");
  
    // アイコン画像を切り替え
    const imagePath = `/assets/GameMaterial/GameScreenImage/color_rock_paper_sicissors_Image/computer/computer_${number}_image.png`;
    computerImage.src = imagePath;
  
    // アニメーションクラスを0.5秒後に削除して元に戻す
    setTimeout(() => {
      computerImage.classList.remove("icon-transition");
    }, 500); // アニメーション時間に合わせて0.5秒
    
   
 }


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
function onRockClick() { 
  checkResult("rock");
  animateButton(document.getElementById("rock_image_id"));
}
function onScissorsClick() {
  checkResult("scissors");
  animateButton(document.getElementById("scissors_image_id"));
}
function onPaperClick() {
  checkResult("paper");
  animateButton(document.getElementById("paper_image_id"));
}

//ボタンのアニメーション処理を関数化
function animateButton(button) {
  button.style.transform = 'translateY(4px)';

  setTimeout(() => {
    button.style.transform = 'translateY(0)';
  }, 100);
}
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
     countDownSound.play();
     countDownSound.volume = 0.4;
   } else {
    countDownSound.pause();
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
  backGroundMusic.loop = true;
  backGroundMusic.play();
  backGroundMusic.volume = 0.4;
  const interval = setInterval(function(){
    gauge_Initial_value -= decreaseRate;
    if(gauge_Initial_value <= 0){
      gauge_Initial_value = 0;
      clearInterval(interval);
      gameEnd();
      disableClicks();
      backGroundMusic.pause();
      backGroundMusic.currentTime = 0;
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
 if (judgement === "勝ち" || judgement === "負け" || judgement === "あいこ") {
 if (computerHand.color === "blue") {
   // 青の場合：勝ちで○、負け・あいこで×
   displayFeedback(judgement === "勝ち" ? "○" : "×", judgement === "勝ち" ? "win" : "lose");
 } else if (computerHand.color === "red") {
   // 赤の場合：負けで○、勝ち・あいこで×
   displayFeedback(judgement === "負け" ? "○" : "×", judgement === "負け" ? "win" : "lose");
 }
}

 console.log(judgement);
 console.log(currentHandNumber, computerHand.type, computerHand.color);
 if (computerHand.color === "blue" && judgement === "勝ち" || computerHand.color === "red" &&  judgement === "負け"){
   currentHandNumber = Math.floor(Math.random() * (Number_Steps_Max + 1 - Number_Steps_Min)) + Number_Steps_Min;
   const newComputerHand = computerHands[currentHandNumber];
   displayComputerHand(currentHandNumber);
   console.log(currentHandNumber, newComputerHand.type, newComputerHand.color);
   //コンボがスタートする判定
   commandStartCount++;
   if (commandStartCount >= 2){
     addCommand = addCommand + 10;
   }
   color_rock_paper_sicissors_Score += addPoint + addCommand;
   //idのscoreがsocreになっていたので修正
   document.getElementById("color_rock_paper-score_id").innerText = color_rock_paper_sicissors_Score;
   localStorage.setItem("color_rock_paper_sicissors_Score", color_rock_paper_sicissors_Score);
   console.log(color_rock_paper_sicissors_Score);
   console.log("保存されたスコア:", localStorage.getItem("color_rock_paper_sicissors_Score"));
 }else{
   addCommand = 0;
   commandStartCount = 0;
 }
}


function displayFeedback(symbol, type) {
 resultFeedback.textContent = symbol;
 resultFeedback.className = `result-feedback ${type}`;
 resultFeedback.style.display = "block";
 // 点滅のコードを.item_user-interfaceに付与
 function flashRedScreen() {
   const userInterfaceElement = document.querySelector(".item_user-interface");
   userInterfaceElement.classList.add("flash-red");
   setTimeout(() => {
     userInterfaceElement.classList.remove("flash-red");
   }, 200); // 点滅時間に合わせて解除
 }
 // バツのときに赤く点滅
 if (symbol === "×") {
   flashRedScreen();
 }
 const winSound = document.getElementById("win-sound");
 const loseSound = document.getElementById("lose-sound");

 // playWinSound 関数の定義
 function playWinSound() {
   if (winSound) {
     winSound.currentTime = 0; // 再生位置をリセット
     winSound.play();          // 再生
   }
 }

 // playLoseSound 関数の定義
 function playLoseSound() {
   if (loseSound) {
     loseSound.currentTime = 0; // 再生位置をリセット
     loseSound.play();          // 再生
   }
 }

 // マルバツの音声
 if (symbol === "○") {
   playWinSound();
} else if (symbol === "×") {
   playLoseSound();
}

 setTimeout(() => {
   resultFeedback.style.display = "none";
 }, 500); // 0.5秒後に非表示
}


//ゲームが終わった時のメッセージ
function  gameEnd(){
 const gameEndImageElement = document.getElementById("game-End_Image_Id");
 gameEndImageElement.src = gameEndImage; // 画像のパスを設定
 gameEndImageElement.style.display = "block"; // 画像を表示
 document.getElementById("color_rock_paper_computer_id").style.display = "none";
 localStorage.setItem("color_rock_paper_sicissors_Score", color_rock_paper_sicissors_Score);
 gameEndSound.play();
 gameEndSound.volume = 0.4;
 setTimeout(() => {
   window.location.href = '/results/color_rock_paper_sicissors'; // リザルト画面のパスに置き換えてください
 }, 3000);
}
disableClicks(); // ゲームが開始されるまではクリックを無効化
 gameStartButton.addEventListener("click", () => {
   backTitleButton.style.opacity = 0;
   backTitleButton.style.cursor = "none";
   backTitleButton.style.pointerEvents = "none";
   backTitleButton.style.display = "none";
   gameStartButton.style.opacity = 0;
   gameStartButton.style.cursor = "none";
   gameStartButton.style.pointerEvents = "none";
   gameStartButton.style.display = "none";
   startMessageImage.style.display = "none"; // スタートボタンが押されたら非表示に
   startCountdown(); // カウントダウン開始
 });

});