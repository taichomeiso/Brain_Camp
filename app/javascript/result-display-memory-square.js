document.addEventListener("turbo:load", () => {
  // ローカルストレージからスコアを取得

  const scoreBox = document.querySelector('.memory-square-result-page__score-display')
  const memorySquareScore = localStorage.getItem('memorySquareYourScore');

  if (!scoreBox) {return null}
  
  // 画面にスコアを表示する
  scoreBox.textContent = memorySquareScore + "点!!";
  
  // フォームの隠しフィールドにスコアをセットする
  const scoreField = document.querySelector('#memory-square-result-page__score-field');
  if (scoreField && memorySquareScore) {
    scoreField.value = memorySquareScore;
  }
});
