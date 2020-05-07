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
  let position;
  while (!board.gameOver()) {
    if (player === "X") {
      position = await getPlayerInput(`What's  your  move X?`);
      position = parseInt(position);
    } else {
      position = getRandomInt();
      console.log(`Computer moved to position ${position}`);
    }
    try {
      board.write(position, player);
      if (player === "X") {
        player = "0";
      } else {
        player = "X";
      }
      l;
    } catch (error) {
      if (player === "X") {
        gameUI.displayErrorMessage(error);
      }
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

function getRandomInt() {
  min = 1;
  max = 10;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
