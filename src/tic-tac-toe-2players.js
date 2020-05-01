const Board = require("./board");
const GameUI = require("./GameUI");
const board = new Board();
const gameUI = new GameUI(board);

//This is a const that allows user to add input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserInput = (question) => {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  });
};

let xTurn = true;
let zeroTurn = false;

gameUI.initialize();

play(xTurn, zeroTurn);

function play(xTurn, zeroTurn) {
  // let player = "X";
  //while boardisnot filled
  // while (!board.gameOver()) {}
  if (xTurn) {
    readline.question(`What's  your  move "X"?`, (position) => {
      position = parseInt(position);
      if (!isInputValid(position)) {
        play(xTurn, zeroTurn);
      } else if (board.isInputOutsideOfBoard(position)) {
        play(xTurn, zeroTurn);
      } else if (!board.isSpotFree(position)) {
        play(xTurn, zeroTurn);
      } else {
        board.write(position, "X");
        xTurn = false;
        zeroTurn = true;
        gameUI.renderBoard();
        if (board.gameOver()) {
          gameUI.displayWinner();
          return readline.close();
        }
        play(xTurn, zeroTurn);
      }
      // if (player === "X") player = "O";
      // else player = "X"
    });
  }

  if (zeroTurn) {
    readline.question(`What's  your  move O?`, (position) => {
      position = parseInt(position);
      if (!isInputValid(position)) {
        play(xTurn, zeroTurn);
      } else if (board.isInputOutsideOfBoard(position)) {
        play(xTurn, zeroTurn);
      } else if (!board.isSpotFree(position)) {
        play(xTurn, zeroTurn);
      } else {
        board.write(position, "O");
        xTurn = true;
        zeroTurn = false;
        gameUI.renderBoard();
        if (board.gameOver()) {
          gameUI.displayWinner();
          return readline.close();
        }
        play(xTurn, zeroTurn);
      }
    });
  }
}

function isInputValid(position) {
  position = parseInt(position);
  if (isNaN(position)) {
    console.log("Input incorrect. Please make sure you add a number from 1-9.");
    return false;
  }
  return true;
}

//DELETE AND MOVE TESTS IN BOARD.TESTS!
function gameOver(winner) {
  return board.isBoardFull() || winner !== null;
}

function displayWinner(winner) {
  if (winner === null) {
    console.log("It's a tie.");
  } else if (winner === "X") {
    console.log("X wins");
  } else if (winner === "O") {
    console.log("O wins");
  }
  return winner;
}

// function displayPositionsBoard(positionsBoard) {
//   console.log(positionsBoard.slice(0, 3));
//   console.log(positionsBoard.slice(3, 6));
//   console.log(positionsBoard.slice(6, 9));
// }

module.exports = {
  isInputValid,
};
