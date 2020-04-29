const Board = require("./board.js");

describe("board", () => {
  it("should be an empty board at the beginning of the game", () => {
    const board = new Board();
    expect(board.get()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
  it("should be a board containing 9 positions", () => {
    const board = new Board();
    let lenght = board.board.length;
    expect(lenght).toBe(9);
  });
});

describe("board actions", () => {
  it("write the value in the given position", () => {
    const board = new Board();
    board.write(1, "X");
    expect(board.get()).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });
  it("should return false if spot is ocuppied", () => {
    const board = new Board();
    board.write(4, "X");
    console.log(board.board[4]);
    expect(board.isSpotFree(4)).toEqual(false);
    board.write(9, "X");
    console.log(board.board[4]);
    expect(board.isSpotFree(9)).toEqual(false);
  });
  it("should return true if spot is free", () => {
    const board = new Board();
    expect(board.isSpotFree(4)).toEqual(true);
    expect(board.isSpotFree(9)).toEqual(true);
  });
  it("should return true if position is outside of the board", () => {
    const board = new Board();
    const position1 = 12;
    expect(board.isInputOutsideOfBoard(position1)).toEqual(true);
    const position2 = -3;
    expect(board.isInputOutsideOfBoard(position2)).toEqual(true);
  });
  it("should return false if position is on the board", () => {
    const board = new Board();
    const position1 = 2;
    expect(board.isInputOutsideOfBoard(position1)).toEqual(false);
    const position2 = 7;
    expect(board.isInputOutsideOfBoard(position2)).toEqual(false);
  });
  it("should return false if input is invalid (not a numer)", () => {
    const board = new Board();
    const position1 = "A";
    expect(board.isInputValid(position1)).toEqual(false);
    const position2 = "ss";
    expect(board.isInputValid(position2)).toEqual(false);
    const position3 = " ";
    expect(board.isInputValid(position3)).toEqual(false);
    const position4 = "$";
    expect(board.isInputValid(position4)).toEqual(false);
  });
  it("should return true if input is valid (a numer)", () => {
    const board = new Board();
    const position1 = "3";
    expect(board.isInputValid(position1)).toEqual(true);
    const position2 = 3;
    expect(board.isInputValid(position2)).toEqual(true);
    const position3 = "-3";
    expect(board.isInputValid(position3)).toEqual(true);
    const position4 = -2;
    expect(board.isInputValid(position4)).toEqual(true);
  });
});
