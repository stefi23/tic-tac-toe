const Board = require("./board");
const GameUI = require("./gameUI");
const board = new Board();
const gameUI = new GameUI(board);

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getPlayerInput = (question) => {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  });
};
let player = "X";
gameUI.initialize();
gamePlay(player);

const gamePlay = async (player) => {
  while (!board.gameOver()) {
    let position = await getPlayerInput(`What's  your  move ${player}?`);
    position = parseInt(position);
    gameUI.displayErrorMessages(position, player);
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
  }
};

// function isInputValid(position) {
//   position = parseInt(position);
//   if (isNaN(position)) {
//     console.log("Input incorrect. Please make sure you add a number from 1-9.");
//     return false;
//   }
//   return true;
// }

// module.exports = {
//   isInputValid,
// };
