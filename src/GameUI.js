const positionsBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const render = (board) => {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
};

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

class GameUI {
  constructor(board) {
    this.board = board;
  }

  initialize() {
    console.log("Welcome to the game!");
    this.renderPositions();
  }
  renderPositions() {
    return render(positionsBoard);
  }

  renderBoard() {
    return render(this.board.getBoard());
  }
  displayWinner() {
    const winner = this.board.getWinner();
    if (winner === null) {
      console.log("It's a tie.");
    } else if (winner === "X") {
      console.log("X wins");
    } else if (winner === "O") {
      console.log("O wins");
    }
    return winner;
  }
}

module.exports = GameUI;
