const Board = require("./board.js");

describe("Board", () => {
  describe("Initializing a new board", () => {
    it("should be an empty board at the beginning of the game", () => {
      const board = new Board();
      expect(board.getBoard()).toEqual(["", "", "", "", "", "", "", "", ""]);
    });
    it("should be a board containing 9 positions", () => {
      const board = new Board();
      let length = board.getBoard().length;
      expect(length).toBe(9);
    });
  });
  describe("#write", () => {
    it("write the value in the given position", () => {
      const board = new Board();
      board.write(1, "X");
      expect(board.board).toEqual(["X", "", "", "", "", "", "", "", ""]);
    });
  });
  describe("#isSpotFree", () => {
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
  });
  describe("#isInputOutsideOfBoard", () => {
    const board = new Board();
    it("should return true if position is outside of the board", () => {
      const position1 = 12;
      expect(board.isInputOutsideOfBoard(position1)).toEqual(true);
      const position2 = -3;
      expect(board.isInputOutsideOfBoard(position2)).toEqual(true);
    });
    it("should return false if position is on the board", () => {
      const position1 = 2;
      expect(board.isInputOutsideOfBoard(position1)).toEqual(false);
      const position2 = 7;
      expect(board.isInputOutsideOfBoard(position2)).toEqual(false);
    });
  });
  describe("#getWinner", () => {
    it("should find the winners", () => {
      const board = new Board();
      board.board = ["", "", "", "", "", "", "", "", ""];
      expect(board.getWinner()).toBe(null);
      board.board = ["O", "", "", "X", "", "X", "O", "", ""];
      expect(board.getWinner()).toBe(null);
      // horizontal
      board.board = ["O", "", "", "X", "X", "X", "O", "", ""];
      expect(board.getWinner()).toBe("X");
      // diagonal
      board.board = ["O", "", "X", "X", "O", "", "", "", "O"];
      expect(board.getWinner()).toBe("O");
      board.board = ["", "", "X", "O", "X", "", "X", "", "O"];
      expect(board.getWinner()).toBe("X");
      // vertical
      board.board = ["O", "", "X", "O", "X", "", "O", "O", ""];
      expect(board.getWinner()).toEqual("O");
    });
  });
  describe("#isBoardFull", () => {
    it("check if the board is filled out", () => {
      const board = new Board();
      board.board = ["O", "X", "X", "O", "X", "O", "O", "O", "X"];
      expect(board.isBoardFull()).toEqual(true);
    });
  });
  it("check if the board is not completely filled out", () => {
    const board = new Board();
    board.board = ["", "X", "X", "O", "X", "O", "O", "", "X"];
    expect(board.isBoardFull()).toEqual(false);
  });
});
