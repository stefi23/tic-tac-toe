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

  write(position, value) {
    let index = position - 1;
    this.board[index] = value;
  }

  isSpotFree(position) {
    if (this.board[position - 1] == "0" || this.board[position - 1] == "X") {
      console.log("Spot is ocuppied. Try again please!");
      return false;
    }
    return true;
  }

  isBoardFull() {
    return !this.board.includes("");
  }

  isInputOutsideOfBoard(position) {
    if (position < 1 || position > 9) {
      console.log("Number should be between 1-9");
      return true;
    }
    return false;
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
