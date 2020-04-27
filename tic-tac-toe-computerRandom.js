const positionsBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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
      if (!isInputCorrect(position)) {
        play(xTurn, zeroTurn);
      } else if (!isInputOutsideOfPositionsboard(position)) {
        play(xTurn, zeroTurn);
      } else if (!istheSpotFree(position)) {
        play(xTurn, zeroTurn);
      } else {
        markXonBoard(position);
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
    mark0onBoard();
    xTurn = true;
    zeroTurn = false;
    render(board);
    if (getWinner()) {
      return readline.close();
    }
    play(xTurn, zeroTurn);
  }
}

function isInputOutsideOfPositionsboard(position) {
  if (position < 1 || position > 9) {
    console.log("Number should be between 1-9");
    return false;
  }
  return true;
}

function isInputCorrect(position) {
  if (Number.isNaN(position)) {
    console.log("Input incorrect. Please make sure you add a number from 1-9.");
    return false;
  }
  return true;
}

function istheSpotFree(position) {
  if (board[position - 1] == "0" || board[position - 1] == "X") {
    console.log("Spot is ocuppied. Try again please!");
    return false;
  }
  return true;
}

function markXonBoard(position) {
  let idx = position - 1;
  board[idx] = "X";
}

function mark0onBoard() {
  let indexForZero = getRandomInt();
  if (board[indexForZero - 1] == "") {
    console.log("Computer turn");
    board[indexForZero - 1] = "0";
  } else {
    mark0onBoard();
  }
}

function getRandomInt() {
  min = 1;
  max = 10;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getWinner() {
  let winner = null;
  winningCombos.forEach((combo, index) => {
    const firstWinningPosition = combo[0];
    const secondWinningPosition = combo[1];
    const thirdWinningPosition = combo[2];
    if (
      board[firstWinningPosition] !== "" &&
      board[firstWinningPosition] === board[secondWinningPosition] &&
      board[firstWinningPosition] === board[thirdWinningPosition]
    ) {
      winner = board[combo[0]];
    }
  });
  displayWinner(winner);
  return winner;
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
