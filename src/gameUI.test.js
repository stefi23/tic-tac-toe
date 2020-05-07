const GameUI = require("./gameUI.js");
const Board = require("./board.js");

const mockConsoleLog = jest.fn();
global.console = {
  log: mockConsoleLog,
};

describe("Game UI", () => {
  describe("#displayWinner", () => {
    it(`should console "It's a tie" in case of a tie`, () => {
      const board = new Board();
      board.board = ["0", "X", "0", "X", "X", "0", "X", "0", "X"];
      const gameUI = new GameUI(board);
      gameUI.displayWinner();
      expect(mockConsoleLog).toHaveBeenCalledWith("It's a tie.");
    });
    it(`should console "X wins" in case of X won`, () => {
      const board = new Board();
      board.board = ["X", "X", "X", "X", "X", "0", "X", "0", "X"];
      console.log("winner", board.getWinner());
      const gameUI = new GameUI(board);
      gameUI.displayWinner();
      expect(mockConsoleLog).toHaveBeenCalledWith("X wins");
    });
    it(`should console " wins" in case of X won`, () => {
      const board = new Board();
      const gameUI2 = new GameUI(board);
      board.board = ["X", "0", "0", "X", "0", "X", "0", "0", "X"];
      gameUI2.displayWinner();
      expect(mockConsoleLog).toHaveBeenCalledWith("0 wins");
    });
  });
  describe("#displayErrorMessages", () => {
    it(`should console "This is not a number. Try again" in case the input is not a number`, () => {
      const board = new Board();
      const gameUI = new GameUI(board);
      let position1 = "A";
      let player = "X";

      try {
        board.write(position1, player); // This throws as you have it right now
      } catch (error) {
        gameUI.displayErrorMessage(error);
      }
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "This is not a number. Please make sure you add a number from 1-9.Try again"
      );
    });
    // it(`should console "Position is outside of board. Try again" in case the position outside of the board`, () => {
    //   const board = new Board();
    //   const gameUI = new GameUI(board);
    //   let position1 = -2;
    //   let player = "X";
    //   let position2 = 22;
    //   gameUI.displayErrorMessages(position1, player);
    //   expect(mockConsoleLog).toHaveBeenCalledWith(
    //     "Position is outside of board. Try again"
    //   );
    //   gameUI.displayErrorMessages(position2, player);
    //   expect(mockConsoleLog).toHaveBeenCalledWith(
    //     "Position is outside of board. Try again"
    //   );
    // });
  });
});
