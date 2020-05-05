const positionsBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const render = (board) => {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
};
const Board = require("./board.js");

class GameUI extends Board {
  constructor(board) {
    super(board);
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
    const winner = this.getWinner();
    if (winner === null) {
      return "It's a tie.";
    } else if (winner === "X") {
      console.log("X wins");
    } else if (winner === "O") {
      console.log("0 wins");
    }
    return winner;
  }
}

module.exports = GameUI;
