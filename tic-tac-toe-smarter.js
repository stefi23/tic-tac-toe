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
let gameOver = false;
let xTurn = true;
let zeroTurn = false;

console.log("Welcome to the game!");

render(positionsBoard);

initializaGame();

play();

//Functions:

function initializaGame() {
  board = ["", "", "", "", "", "", "", "", ""];
}

function render(board) {
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
}

function play() {
  if (!gameOver && xTurn) {
    readline.question(`What's  your  move X?`, (position) => {
      position = parseInt(position);
      if (!isInputCorrect(position)) {
        play();
      } else if (!isInputOutsideOfPositionsboard(position)) {
        play();
      } else if (!istheSpotFree(position)) {
        play();
      } else {
        markXonBoard(position);
        render(board);
        getWinner();
        play();
      }
    });
  }

  if (!gameOver && zeroTurn) {
    mark0onBoard();
    render(board);
    getWinner();
    play();
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
  zeroTurn = true;
}

function mark0onBoard() {
  zeroTurn = false;
  let indexForZero = getRandomInt();

  console.log("Stefi's turn");

  if (board[4] == "") {
    board[4] = "0";
  } else if (isXclosetoWinning()) {
    board[isXclosetoWinning()] = "0";
  } else {
    if (board[indexForZero - 1] == "") {
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

  winner = winner ? winner : board.includes("") ? null : "Tie";
  if (winner === "X") {
    console.log("X wins");
    gameOver = true;
    readline.close();
  } else if (winner === "0") {
    console.log("Stefi wins");
    gameOver = true;
    readline.close();
  } else if (winner === "Tie") {
    console.log("It's a tie.");
    gameOver = true;
    readline.close();
  }
  return winner;
}
