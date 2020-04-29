class Board {
  board = ["", "", "", "", "", "", "", "", ""];

  get() {
    return this.board;
  }

  render() {
    console.log(this.board.slice(0, 3));
    console.log(this.board.slice(3, 6));
    console.log(this.board.slice(6, 9));
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

  isInputOutsideOfBoard(position) {
    if (position < 1 || position > 9) {
      console.log("Number should be between 1-9");
      return true;
    }
    return false;
  }

  isInputValid(position) {
    position = parseInt(position);
    if (isNaN(position)) {
      console.log(
        "Input incorrect. Please make sure you add a number from 1-9."
      );
      return false;
    }
    return true;
  }
}

module.exports = Board;
