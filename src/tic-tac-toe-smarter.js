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
let computerTurn = false;

console.log("Welcome to the game!");
console.log("Will Stefi beat you?");

render(positionsBoard);

initializaGame();

play(xTurn, computerTurn);

//Functions:

function initializaGame() {
  board = ["", "", "", "", "", "", "", "", ""];
}

function render(board) {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
}

function play(xTurn, computerTurn) {
  if (getWinner() === "tie") {
    return readline.close();
  }
  if (xTurn) {
    readline.question(`What's  your  move X?`, (position) => {
      position = parseInt(position);
      if (!isInputCorrect(position)) {
        play(xTurn, computerTurn);
      } else if (!isInputOutsideOfPositionsboard(position)) {
        play(xTurn, computerTurn);
      } else if (!istheSpotFree(position)) {
        play(xTurn, computerTurn);
      } else {
        markXonBoard(position);
        xTurn = false;
        computerTurn = true;
        render(board);
        if (getWinner()) {
          return readline.close();
        }
        play(xTurn, computerTurn);
      }
    });
  }

  if (computerTurn) {
    mark0onBoard();
    xTurn = true;
    computerTurn = false;
    render(board);
    if (getWinner()) {
      return readline.close();
    }
    play(xTurn, computerTurn);
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
  xTurn = false;
  let idx = position - 1;
  board[idx] = "X";
  computerTurn = true;
}

function mark0onBoard() {
  computerTurn = false;
  let indexForZero = getRandomInt();

  if (board[4] == "") {
    console.log("Stefi's turn");
    board[4] = "0";
  } else if (isXclosetoWinning()) {
    console.log("Stefi's turn");
    board[isXclosetoWinning()] = "0";
  } else if (isComputerclosetoWinning()) {
    console.log("Stefi's turn");
    board[isComputerclosetoWinning()] = "0";
  } else {
    if (board[indexForZero - 1] == "") {
      console.log("Stefi's turn");
      board[indexForZero - 1] = "0";
    } else if (
      board[indexForZero - 1] == "X" ||
      board[indexForZero - 1] == "0"
    ) {
      mark0onBoard();
    }
  }
  xTurn = true;
}

function isXclosetoWinning() {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i];
    const firstWinningPosition = combo[0];
    const secondWinningPosition = combo[1];
    const thirdWinningPosition = combo[2];
    if (
      board[firstWinningPosition] == "X" &&
      board[firstWinningPosition] == board[secondWinningPosition] &&
      board[thirdWinningPosition] !== "0"
    ) {
      return thirdWinningPosition;
    }
    if (
      board[firstWinningPosition] == "X" &&
      board[firstWinningPosition] == board[thirdWinningPosition] &&
      board[secondWinningPosition] !== "0"
    ) {
      return secondWinningPosition;
    }
    if (
      board[secondWinningPosition] == "X" &&
      board[secondWinningPosition] == board[thirdWinningPosition] &&
      board[firstWinningPosition] !== "0"
    ) {
      return firstWinningPosition;
    }
  }
  return null;
}

function isComputerclosetoWinning() {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i];
    const firstWinningPosition = combo[0];
    const secondWinningPosition = combo[1];
    const thirdWinningPosition = combo[2];
    if (
      board[firstWinningPosition] == "0" &&
      board[firstWinningPosition] == board[secondWinningPosition] &&
      board[thirdWinningPosition] !== "X"
    ) {
      return thirdWinningPosition;
    }
    if (
      board[firstWinningPosition] == "0" &&
      board[firstWinningPosition] == board[thirdWinningPosition] &&
      board[secondWinningPosition] !== "X"
    ) {
      return secondWinningPosition;
    }
    if (
      board[secondWinningPosition] == "0" &&
      board[secondWinningPosition] == board[thirdWinningPosition] &&
      board[thirdWinningPosition] !== "X"
    ) {
      return firstWinningPosition;
    }
  }
  return null;
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

  if (displayWinner(winner) === "tie") {
    console.log("You have a tie!");
    return "tie";
  }

  return winner;
}

function displayWinner(winner) {
  if (winner === null && !board.includes("")) {
    return "tie";
  } else if (winner === "X") {
    console.log("X wins");
  } else if (winner === "0") {
    console.log("0 wins");
  }
  return winner;
}
