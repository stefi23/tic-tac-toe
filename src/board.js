const {
  ERROR_NOT_A_NUMBER,
  ERROR_POSITION_OUTSIDE_OF_BOARD,
  ERROR_SPOT_IS_OCCUPIED,
} = require("./constants");

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

class Board {
  board = ["", "", "", "", "", "", "", "", ""];

  getBoard() {
    return this.board;
  }

  write(position, player) {
    position = parseInt(position);
    if (isNaN(position)) {
      throw new Error(ERROR_NOT_A_NUMBER);
    }
    const index = position - 1;
    const value = this.board[index];

    if (typeof value === "undefined") {
      throw new Error(ERROR_POSITION_OUTSIDE_OF_BOARD);
    }
    const isSpotFree = value === "";
    if (!isSpotFree) {
      throw new Error(ERROR_SPOT_IS_OCCUPIED);
    }
    this.board[index] = player;
  }

  // isInputValid(position) {
  //   position = parseInt(position);
  //   if (isNaN(position)) {
  //     return false;
  //   }
  //   return true;
  // }

  // isSpotFree(position) {
  //   if (this.board[position - 1] == "0" || this.board[position - 1] == "X") {
  //     console.log("Spot is ocuppied. Try again please!");
  //     return false;
  //   }
  //   return true;
  // }

  // isInputOutsideOfBoard(position) {
  //   if (position < 1 || position > 9) {
  //     console.log("Number should be between 1-9");
  //     return true;
  //   }
  //   return false;
  // }

  isBoardFull() {
    return !this.board.includes("");
  }

  getWinner() {
    const { board } = this;
    for (const [
      firstPosition,
      secondPosition,
      thirdPosition,
    ] of winningCombos) {
      if (
        board[firstPosition] !== "" &&
        board[firstPosition] === board[secondPosition] &&
        board[firstPosition] === board[thirdPosition]
      ) {
        return board[firstPosition];
      }
    }
    return null;
  }

  gameOver() {
    return this.isBoardFull() || this.getWinner() !== null;
  }
}

module.exports = Board;
