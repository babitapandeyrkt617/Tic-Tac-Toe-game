document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetButton = document.getElementById("reset-button");
  const message = document.getElementById("message");
  console.log(cells);
  console.log(resetButton);
  console.log(message);
  let currentPlayer = "X";
  let gameActive = true;
  let moves = 0;
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const cellValues = ["", "", "", "", "", "", "", "", ""];

  const handleCellClick = (e) => {
    const index = parseInt(e.target.id.split("-")[1]);
    console.log(index);
    if (cellValues[index] === "" && gameActive) {
      moves++;
      cellValues[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      if (checkWin()) {
        message.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
      } else if (moves === 9) {
        message.textContent = "its a drow!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `${currentPlayer}'s turn`;
      }
    }
  };

  const checkWin = () => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cellValues[a] !== "" &&
        cellValues[a] === cellValues[b] &&
        cellValues[a] === cellValues[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    moves = 0;
    cellValues.fill("");
    cells.forEach((cell) => (cell.textContent = ""));
    message.textContent = `${currentPlayer}'s turn`;
  };
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);
});
