"use strict";
//choose and background blur elements
const chooseElement = document.querySelector(".choose");
const chooseLetter = [...document.querySelectorAll(".choose-letter")];
const blurElement = document.querySelector(".background-blur");

//tiles to play
let tile1 = document.querySelector(".tile-1");
let tile2 = document.querySelector(".tile-2");
let tile3 = document.querySelector(".tile-3");
let tile4 = document.querySelector(".tile-4");
let tile5 = document.querySelector(".tile-5");
let tile6 = document.querySelector(".tile-6");
let tile7 = document.querySelector(".tile-7");
let tile8 = document.querySelector(".tile-8");
let tile9 = document.querySelector(".tile-9");

//GAME INFORMATION
let player1letterEl = document.getElementById("player-1-letter");
let player2letterEl = document.getElementById("player-2-letter");
let winnerInfoEl = document.getElementById("info-winner");

//restart button
let restartBtn = document.querySelector(".btn-restart");

//all tiles selected at once
const tiles = [...document.querySelectorAll(".tile")];

//starting values
let player1letter,
  player2letter,
  activePlayer,
  playing = true;

//the initial state of the game
function init() {
  player1letter = "";
  player2letter = "";
  player1letterEl.textContent = player1letter;
  player2letterEl.textContent = player2letter;
  activePlayer = 1;
  playing = true;
  chooseElement.classList.toggle("hidden");
  blurElement.classList.toggle("hidden");
  winnerInfoEl.textContent = ``;
  document.querySelector("body").style.backgroundColor = "#000";

  // for (let tile = 0; tile < tiles.length; tile++) {
  //   tiles[tile].textContent = "";
  //   tiles[tile].removeAttribute("disabled");
  //   tiles[tile].classList.remove("chosen");
  //   tiles[tile].classList.remove("winner");
  // }

  tiles.forEach((tile) => {
    tile.textContent = "";
    tile.removeAttribute("disabled");
    tile.classList.remove("chosen");
    tile.classList.remove("winner");
  });

  tiles.forEach((tile) => {
    return tile.classList.remove("change-borders");
  });
}

//when the game has been won
function endGame() {
  playing = false;
  winnerInfoEl.textContent = `PLAYER ${activePlayer} WINS!`;
  document.querySelector("body").style.backgroundColor = "#a50104";
  tiles.forEach((tile) => {
    return tile.classList.add("change-borders");
  });
}

init();

//at the beginning of the game player 1 is the active player
//Player 1 needs to choose a letter to continue with the game
chooseLetter.forEach((letter) => {
  return letter.addEventListener("click", function () {
    //the letter player one chooses becomes his letter
    player1letter = letter.textContent;
    player1letterEl.textContent = player1letter;
    //the letter the player did not choose becomes player2's letter
    player1letter === "X"
      ? ((player2letter = "O"), (player2letterEl.textContent = player2letter))
      : ((player2letter = "X"), (player2letterEl.textContent = player2letter));

    //after he has chosen the background blur and choose letter prompt are hidden
    chooseElement.classList.add("hidden");
    blurElement.classList.add("hidden");
  });
});

//combinations to win the game
let combinations = [
  [tile1, tile2, tile3],
  [tile4, tile5, tile6],
  [tile7, tile8, tile9],
  [tile1, tile4, tile7],
  [tile2, tile5, tile8],
  [tile3, tile6, tile9],
  [tile1, tile5, tile9],
  [tile3, tile5, tile7],
];

tiles.forEach((current) => {
  //adds an event listener to each of the tiles
  return current.addEventListener("click", function () {
    //if the active player clicks a tile and the game is still running, then continue
    if (playing) {
      activePlayer === 1
        ? (this.textContent = player1letter)
        : (this.textContent = player2letter);
      this.classList.add("chosen");
      //we disable the clicked tile to prevent future changes
      this.setAttribute("disabled", "");
    }

    //after a player plays, it checks if the person has won already
    //if there is a row that has been won, then end the game and display the winner
    if (
      combinations.some((curr) => {
        return curr.every((c) => {
          return c.textContent === "O";
        });
      }) ||
      combinations.some((curr) => {
        return curr.every((c) => {
          return c.textContent === "X";
        });
      })
    ) {
      endGame();
    }
    //if none of these combinations are true then just skip to the next player
    else {
      activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
    }
  });

  //old code gpes here
});

//when a player clicks the restart button
restartBtn.addEventListener("click", init);
