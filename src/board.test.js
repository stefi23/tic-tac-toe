const Board = require("./board.js");

describe("board", () => {
  it("should be an empty board at the beginning of the game", () => {
    const board = new Board();
    expect(board.get()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
  it("write the value in the given position", () => {
    const board = new Board();
    board.write(1, "X");
    expect(board.get()).toEqual(["", "X", "", "", "", "", "", "", ""]);
  });
});
