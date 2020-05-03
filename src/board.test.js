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
  });
  it("Should return board if game is not over", () => {
    const board = new Board();
    board.board = ["X", "", "", "X", "", "0", "", "", "0"];
    expect(board.isBoardFull()).toEqual(false);
  });
});

// describe("#isSpotFree", () => {
//   it("should return false if spot is ocuppied", () => {
//     const board = new Board();
//     board.write(4, "X");
//     console.log(board.board[4]);
//     expect(board.isSpotFree(4)).toEqual(false);
//     board.write(9, "X");
//     console.log(board.board[4]);
//     expect(board.isSpotFree(9)).toEqual(false);
//   });
//   it("should return true if spot is free", () => {
//     const board = new Board();
//     expect(board.isSpotFree(4)).toEqual(true);
//     expect(board.isSpotFree(9)).toEqual(true);
//   });
// });
// describe("#isInputOutsideOfBoard", () => {
//   const board = new Board();
//   it("should return true if position is outside of the board", () => {
//     const position1 = 12;
//     expect(board.isInputOutsideOfBoard(position1)).toEqual(true);
//     const position2 = -3;
//     expect(board.isInputOutsideOfBoard(position2)).toEqual(true);
//   });
//   it("should return false if position is on the board", () => {
//     const position1 = 2;
//     expect(board.isInputOutsideOfBoard(position1)).toEqual(false);
//     const position2 = 7;
//     expect(board.isInputOutsideOfBoard(position2)).toEqual(false);
//   });
// });
