const Board = require("./board");
const GameUI = require("./GameUI");
const board = new Board();
const gameUI = new GameUI(board);

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const getPlayerInput = (question) => {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  });
};

let player = "X";
const gamePlay = async (player) => {
  while (!board.gameOver()) {
    let position = await getPlayerInput(`What's  your  move ${player}?`);
    position = parseInt(position);
    if (
      isInputValid(position) &&
      !board.isInputOutsideOfBoard(position) &&
      board.isSpotFree(position)
    ) {
      board.write(position, player);

      if (player === "X") {
        player = "0";
      } else {
        player = "X";
      }
      gameUI.renderBoard();
      if (board.gameOver()) {
        gameUI.displayWinner();
        return readline.close();
      }
    } else {
      if (!isInputValid(position)) {
        gamePlay(player);
      } else if (board.isInputOutsideOfBoard(position)) {
        gamePlay(player);
      } else if (!board.isSpotFree(position)) {
        gamePlay(player);
      }
    }
  }
};

gameUI.initialize();
gamePlay(player);

function isInputValid(position) {
  position = parseInt(position);
  if (isNaN(position)) {
    console.log("Input incorrect. Please make sure you add a number from 1-9.");
    return false;
  }
  return true;
}

module.exports = {
  isInputValid,
};
