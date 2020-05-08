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

  isPlayerCloseToWinning(player) {
    const { board } = this;
    let oppositePlayer;
    if (player === "X") {
      oppositePlayer = "0";
    } else {
      oppositePlayer = "X";
    }
    for (let i = 0; i < winningCombos.length; i++) {
      let combo = winningCombos[i];
      const firstWinningPosition = combo[0];
      const secondWinningPosition = combo[1];
      const thirdWinningPosition = combo[2];
      if (
        board[firstWinningPosition] == player &&
        board[firstWinningPosition] == board[secondWinningPosition] &&
        board[thirdWinningPosition] !== oppositePlayer
      ) {
        return thirdWinningPosition + 1;
      }
      if (
        board[firstWinningPosition] == player &&
        board[firstWinningPosition] == board[thirdWinningPosition] &&
        board[secondWinningPosition] !== oppositePlayer
      ) {
        return secondWinningPosition + 1;
      }
      if (
        board[secondWinningPosition] == player &&
        board[secondWinningPosition] == board[thirdWinningPosition] &&
        board[thirdWinningPosition] !== oppositePlayer
      ) {
        return firstWinningPosition + 1;
      }
    }
    return false;
  }
}

module.exports = Board;
