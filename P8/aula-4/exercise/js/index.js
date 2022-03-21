// @ts-check

"use strict";

// declaracao de constantes
const message = document.querySelector("#message");
const panelControl = document.getElementById("panel-control");
const panelGame = document.querySelector("#panel-game");
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");

// declarar a funcao reset
/**
 * Enables/disabled the play button
 *
 * @param {boolean} status
 */
function playButtonStatus(status = true) {
  btPlay.disabled = status;
}

/**
 * Enables the panel game when the selected value is a valid level.
 */
function enablePanelGame(status) {
  if (status) {
    panelGame.style.display = "grid";
  } else {
    panelGame.style.display = "none";
  }
}

function getPlayButtonStatus() {
  btLevel.addEventListener("change", (event) => {
    // Se opcao é maior que 0, botao fica activo
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case "1":
      case "2":
      case "3":
        playButtonStatus(false); // enables the button
        enablePanelGame(true);
        break;

      case "0":
      default:
        playButtonStatus(); // keeps the button disabled
        enablePanelGame(false);
        break;
    }
  });
}

function changeLevelButtonDisabledStatus(status = true) {
  btLevel.disabled = status;
}

function reset() {
  enablePanelGame(false);

  btPlay.textContent = "Iniciar Jogo";

  message.textContent = "";
  message.classList.remove("hide");

  changeLevelButtonDisabledStatus(false);

  showOrHidePanelControl();

  playButtonStatus();
}

/**
 * Toggles the Panel Control visibility
 *
 * @param {"show" | "hide"} type
 */
function showOrHidePanelControl(type) {
  const allGameStartedItems = panelControl.querySelectorAll(".gameStarted");

  // If show, removes the "hide" class
  // else, add the "hide" class
  allGameStartedItems.forEach(function (item) {
    if (type === "show") {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

/**
 * Depending on the text content of the button,
 * Returns the inverse.
 *
 * @param {"Iniciar Jogo" | "Terminar Jogo"} innerContent
 */
function changeButtonText(innerContent) {
  switch (innerContent) {
    case "Iniciar Jogo":
      return "Terminar Jogo";

    case "Terminar Jogo":
    default:
      return "Iniciar Jogo";
  }
}

/**
 * When clicking on the "Iniciar Jogo" button:
 * - Change the text content to "Terminar Jogo"
 * - Disable the btLevel select element
 * - Show the panelControl element
 * - Show the panelGame element
 */
function startGame(event) {
  const target = event.target;

  // if clicked on "Terminar Jogo", end the game and exit early
  if (target.textContent === "Terminar Jogo") {
    reset();

    return;
  }

  // Otherwise, change the text to "Iniciar Jogo" and disable the btLevel.
  const buttonText = changeButtonText(target.textContent);

  target.textContent = buttonText;

  changeLevelButtonDisabledStatus(true);
}

reset();
getPlayButtonStatus();

// Add a click event listener on the button,
// so that we can access it through out the whole
// lifecycle of the game
btPlay.addEventListener("click", startGame);
