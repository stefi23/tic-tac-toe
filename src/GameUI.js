const positionsBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const render = (board) => {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
};

const {
  ERROR_NOT_A_NUMBER,
  ERROR_POSITION_OUTSIDE_OF_BOARD,
  ERROR_SPOT_IS_OCCUPIED,
} = require("./constants");

// const Board = require("./board.js");

class GameUI {
  constructor(board) {
    // super(board);
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
    } else if (winner === "0") {
      console.log("0 wins");
    }
    return winner;
  }

  displayErrorMessages(position, player) {
    try {
      this.board.write(position, player);
    } catch (error) {
      console.log("ERROR", error.message);
      if (error.message === ERROR_NOT_A_NUMBER) {
        console.log(
          "This is not a number. Please make sure you add a number from 1-9.Try again"
        );
      } else if (error.message === ERROR_POSITION_OUTSIDE_OF_BOARD) {
        console.log("Position is outside of board. Try again");
      } else if (error.message === ERROR_SPOT_IS_OCCUPIED) {
        console.log("Spot is occupied. Try again");
      }
    }
  }
}

module.exports = GameUI;
