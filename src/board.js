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
    this.board[position] = value;
  }
  /*
  Homework:

  function in which we can pass a value x or 0 -> add also test
  start with the test
  */
}

module.exports = Board;
