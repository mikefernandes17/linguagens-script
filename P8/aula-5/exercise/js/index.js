"use strict";
// ------------------------
// Global Variables
// ------------------------
const message = document.querySelector("#message");
const panelControl = document.querySelector("#panel-control");
const panelGame = document.querySelector("#panel-game");
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");

// ------------------------
// Game Functions
// ------------------------

/**
 * Depending on the selected level (default is "0"):
 *
 * - If its a valid level, enables the play button and shows the deck of cards
 * - Otherwise, keeps the play button disabled
 */
function togglePlayButtonAndPanelGame() {
  switch (btLevel.value) {
    default:
    case "0":
      btPlay.disabled = true;
      break;

    case "1":
    case "2":
    case "3":
      btPlay.disabled = false;
      panelGame.style.display = "grid";
      break;
  }
}

/**
 * Brings the game back to its original position.
 *
 * - Clears the message text content and removes the .hide class to make it save space on the page
 * - Hides the panel game
 * - Hides all the elements in the panel control
 */
function reset() {
  message.textContent = "";
  message.classList.remove("hide");

  panelGame.style.display = "none";

  const elementos = panelControl.querySelectorAll(".gameStarted");
  elementos.forEach((elemento) => {
    elemento.classList.add("hide");
  });

  togglePlayButtonAndPanelGame();
}

/**
 * Starts the game
 *
 * - Disables the "Level" select element
 * - Changes the text content of the play button
 * - Shows all the elements of the panel control
 * - Hides the message
 */
function startGame() {
  btLevel.disabled = true;

  btPlay.textContent = "Terminar Jogo";

  const elementos = panelControl.querySelectorAll(".gameStarted");
  elementos.forEach((elemento) => {
    elemento.classList.remove("hide");
  });

  message.classList.add("hide");
}

/**
 * Stops the game
 *
 * - Changes the text content of the button back to "Iniciar Jogo"
 * - Enables the "Level" select
 * - Executes the `reset` function, making the back fall back to its original position
 */
function stopGame() {
  btPlay.textContent = "Iniciar Jogo";

  btLevel.disabled = false;

  reset();
}

reset();

// ------------------------
// Event Listeners
// ------------------------
btLevel.addEventListener("change", reset);

/**
 * Toggles the content of the game depending on the text content of the button:
 *
 * - If it is running (has the text content of "Terminar Jogo"), stops the game
 * - Otherwise, starts
 */
btPlay.addEventListener("click", function () {
  switch (btPlay.textContent) {
    case "Terminar Jogo":
      stopGame();
      break;

    default:
      startGame();
  }
});

/**
 * Whenever we click on any of the cards:
 *
 * - If the user hasn't started the game yet, then we show a message stating that
 * - Otherwise, just proceed and keep the message text content clean.
 *
 */
panelGame.addEventListener("click", () => {
  message.textContent === ""
    ? (message.textContent = "Clique em Iniciar o Jogo!")
    : (message.textContent = "");
});
