const positionsBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Board = require("./board");

//This is a const that allows user to add input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board;
let xTurn = true;
let zeroTurn = false;

console.log("Welcome to the game!");

render(positionsBoard);

initializaGame();

play(xTurn, zeroTurn);

//Functions:

function initializaGame() {
  board = ["", "", "", "", "", "", "", "", ""];
}

function render(board) {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
}

function play(xTurn, zeroTurn) {
  if (xTurn) {
    readline.question(`What's  your  move X?`, (position) => {
      position = parseInt(position);
      if (!isInputValid(position)) {
        play(xTurn, zeroTurn);
      } else if (!isInputOutsideOfPositionsboard(position)) {
        play(xTurn, zeroTurn);
      } else if (!istheSpotFree(position)) {
        play(xTurn, zeroTurn);
      } else {
        markXonBoard(board, position);
        xTurn = false;
        zeroTurn = true;
        render(board);
        if (getWinner()) {
          return readline.close();
        }
        play(xTurn, zeroTurn);
      }
    });
  }

  if (zeroTurn) {
    readline.question(`What's  your  move 0?`, (position) => {
      position = parseInt(position);
      if (!isInputValid(position)) {
        play(xTurn, zeroTurn);
      } else if (!isInputOutsideOfPositionsboard(position)) {
        play(xTurn, zeroTurn);
      } else if (!istheSpotFree(position)) {
        play(xTurn, zeroTurn);
      } else {
        mark0onBoard(position);
        board.write("x", 2);
        xTurn = true;
        zeroTurn = false;
        render(board);
        if (getWinner()) {
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

function isInputOutsideOfBoard(position) {
  if (position < 1 || position > 9) {
    console.log("Number should be between 1-9");
    return true;
  }
  return false;
}

function displayWinner(winner) {
  if (winner === null && !board.includes("")) {
    console.log("It's a tie.");
  } else if (winner === "X") {
    console.log("X wins");
  } else if (winner === "0") {
    console.log("0 wins");
  }
  return winner;
}

module.exports = {
  isInputValid,
  isInputOutsideOfBoard,
};
