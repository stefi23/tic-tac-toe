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

const gamePlay = async (player) => {
  while (!board.gameOver()) {
    let position = await getPlayerInput(`What's  your  move ${player}?`);
    position = parseInt(position);
    try {
      board.write(position, player);
      if (player === "X") {
        player = "0";
      } else {
        player = "X";
      }
    } catch (error) {
      gameUI.displayErrorMessage(error);
    }

    gameUI.renderBoard();
    if (board.gameOver()) {
      gameUI.displayWinner();
      return readline.close();
    }
  }
};

gameUI.initialize();
gamePlay(player);
