const Board = require("./board.js");
const {
  ERROR_NOT_A_NUMBER,
  ERROR_POSITION_OUTSIDE_OF_BOARD,
  ERROR_SPOT_IS_OCCUPIED,
  PLAYER_ONE,
} = require("./constants");

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
    describe("happy path", () => {
      it("write the value in the given position", () => {
        const board = new Board();
        board.write(1, "X");
        expect(board.getBoard()).toEqual(["X", "", "", "", "", "", "", "", ""]);
      });
    });
    describe("sad paths", () => {
      it.each(["A", " ", "^%"])(
        "rejects %s because it isn't a number",
        (position) => {
          const board = new Board();
          expect(() => {
            board.write(position, PLAYER_ONE);
          }).toThrow(ERROR_NOT_A_NUMBER);
        }
      );
      it.each([22, -2, 10, 1029, -3, 0])(
        "Position %d outside of the board",
        (position) => {
          const board = new Board();
          expect(() => {
            board.write(position, PLAYER_ONE);
          }).toThrow(ERROR_POSITION_OUTSIDE_OF_BOARD);
        }
      );
      it.each([1, 3, 4, 5, 7, 9])("Spot %d is occupied", (position) => {
        const board = new Board();
        board.board = ["X", "", "X", "0", "X", "", "X", "", "0"];
        expect(() => {
          board.write(position, PLAYER_ONE);
        }).toThrow(ERROR_SPOT_IS_OCCUPIED);
      });
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
  describe("#getWinner", () => {
    it("It should return null if there is no winner and game is not yet over", () => {
      const board = new Board();
      board.board = ["", "", "", "", "", "", "", "", ""];
      expect(board.getWinner()).toBe(null);
      board.board = ["0", "", "", "X", "", "X", "0", "", ""];
      expect(board.getWinner()).toBe(null);
    });

    it("It should the winner horizontally", () => {
      const board = new Board();
      board.board = ["0", "", "", "X", "X", "X", "0", "", ""];
      expect(board.getWinner()).toBe("X");
      board.board = ["0", "0", "0", "", "X", "X", "0", "", ""];
      expect(board.getWinner()).toBe("0");
      board.board = ["0", "0", "X", "", "X", "X", "X", "X", "X"];
      expect(board.getWinner()).toBe("X");
    });
    it("It should the winner diagonally", () => {
      const board = new Board();
      board.board = ["O", "", "X", "X", "O", "", "", "", "O"];
      expect(board.getWinner()).toBe("O");
      board.board = ["", "", "X", "O", "X", "", "X", "", "O"];
      expect(board.getWinner()).toBe("X");
    });
    it("It should the winner vertically", () => {
      const board = new Board();
      board.board = ["0", "", "X", "0", "X", "", "0", "0", ""];
      expect(board.getWinner()).toEqual("0");
      board.board = ["", "X", "X", "0", "X", "", "0", "X", ""];
      expect(board.getWinner()).toEqual("X");
      board.board = ["X", "", "0", "", "", "0", "X", "", "0"];
      expect(board.getWinner()).toEqual("0");
    });
  });
  describe("#gameOver", () => {
    it("Should return true if game is over", () => {
      const board = new Board();
      board.board = ["0", "X", "0", "X", "X", "0", "X", "0", "X"];
      expect(board.gameOver()).toEqual(true);
    });

    it("Should return board if game is not over", () => {
      const board = new Board();
      board.board = ["X", "", "", "X", "", "0", "", "", "0"];
      expect(board.isBoardFull()).toEqual(false);
    });
  });
  describe("#isPlayerCloseToWinning", () => {
    it("should return null in case player is not close to winning", () => {
      let player = "X";
      const board = new Board();
      board.board = ["", "X", "", "", "", "0", "", "", ""];
      let result = board.isPlayerCloseToWinning(player);
      expect(result).toEqual(false);
    });
    it("should be the next position that would account for a win in case X is the player", () => {
      const board = new Board();
      const cases = [
        { board: ["X", "X", "", "", "", "0", "", "", ""], expected: 3 },
        { board: ["0", "0", "X", "", "", "X", "", "", ""], expected: 9 },
        { board: ["X", "", "", "", "X", "0", "", "", ""], expected: 9 },
        { board: ["X", "", "", "X", "X", "", "", "", ""], expected: 6 },
        { board: ["", "X", "X", "0", "0", "", "", "", ""], expected: 1 },
        { board: ["", "", "0", "0", "X", "", "0", "X", ""], expected: 2 },
      ];
      cases.forEach(({ board: boardDef, expected }) => {
        board.board = boardDef;
        const result = board.isPlayerCloseToWinning("X");
        expect(result).toEqual(expected);
      });
    });
    it("should be the next position that would account for a win in case 0 is the player", () => {
      const board = new Board();
      const cases = [
        { board: ["", "0", "0", "", "", "X", "", "", ""], expected: 1 },
        { board: ["0", "0", "", "", "", "X", "X", "", ""], expected: 3 },
        { board: ["0", "X", "", "", "", "X", "", "", "0"], expected: 5 },
        { board: ["X", "", "", "", "X", "", "", "0", "0"], expected: 7 },
        { board: ["0", "X", "X", "", "0", "", "0", "", ""], expected: 4 },
        { board: ["", "0", "X", "X", "0", "", "X", "", ""], expected: 8 },
      ];
      cases.forEach(({ board: boardDef, expected }) => {
        board.board = boardDef;
        const result = board.isPlayerCloseToWinning("0");
        expect(result).toEqual(expected);
      });
    });
  });
});
