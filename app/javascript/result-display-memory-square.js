document.addEventListener("turbo:load", () => {
  function loadScoreFromLocalStorage() {
    const memorySquareScore = localStorage.getItem('memorySquareYourScore');
    document.querySelector('.memory-square-result-page__score-display').textContent = memorySquareScore + "点!!";
  }
  loadScoreFromLocalStorage();
});
