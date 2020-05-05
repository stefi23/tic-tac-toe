const GameUI = require("./gameUI.js");
const Board = require("./board.js");

const mockConsoleLog = jest.fn();
global.console = {
  log: mockConsoleLog,
};

describe("Game UI", () => {
  describe("#displayWinner", () => {
    it("should console It's a tie in case of a tie", () => {
      const gameUI = new GameUI();
      //   const board = new Board();
      gameUI.board = ["0", "X", "0", "X", "X", "0", "X", "0", "X"];
      expect(gameUI.displayWinner()).toEqual("It's a tie.");
    });
    it(`should console "X wins" in case of X won`, () => {
      const gameUI = new GameUI();

      gameUI.board = ["X", "X", "X", "X", "X", "0", "X", "0", "X"];
      gameUI.displayWinner();
      expect(mockConsoleLog).toHaveBeenCalledWith("X wins");
    });
    it(`should console " wins" in case of X won`, () => {
      const gameUI2 = new GameUI();
      gameUI2.board = ["X", "0", "0", "X", "0", "X", "0", "0", "X"];
      gameUI2.displayWinner();
      expect(mockConsoleLog).toHaveBeenCalledWith("0 wins");
    });
  });
});
