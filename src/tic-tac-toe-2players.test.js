const {
  isInputValid,
  isInputOutsideOfBoard,
} = require("./tic-tac-toe-2players");

describe("TwoPlayers", () => {
  describe("#isInputValid", () => {
    it("should return false if input is invalid (not a numer)", () => {
      const position1 = "A";
      expect(isInputValid(position1)).toEqual(false);
      const position2 = "ss";
      expect(isInputValid(position2)).toEqual(false);
      const position3 = " ";
      expect(isInputValid(position3)).toEqual(false);
      const position4 = "$";
      expect(isInputValid(position4)).toEqual(false);
    });
    it("should return true if input is valid (a numer)", () => {
      const position1 = "3";
      expect(isInputValid(position1)).toEqual(true);
      const position2 = 3;
      expect(isInputValid(position2)).toEqual(true);
      const position3 = "-3";
      expect(isInputValid(position3)).toEqual(true);
      const position4 = -2;
      expect(isInputValid(position4)).toEqual(true);
    });
  });
});
