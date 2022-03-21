"use strict";

// declaracao de constantes
const message = document.querySelector("#message");
const panelControl = document.getElementById("panel-control");
const panelGame = document.querySelector("#panel-game");
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");

/**
 * Resets the game visuals.
 */
function reset() {
  // hide the card deck
  panelGame.style.display = "none";

  // Clears the message's text content
  toggleTheMessageVisibility("show");

  // Hides all elements from the panel control
  // by adding a ".hide" class to them
  togglePanelControlVisibility("hide");

  // Disables the play button
  btPlay.disabled = true;
}

/**
 *
 *
 * @param {"show" | "hide"} action
 * @param {string} content
 */
function toggleTheMessageVisibility(action, content = "") {
  message.textContent = content;

  switch (action) {
    // Hides the message element
    case "show":
      message.classList.add("hide");
      break;

    // Shows the message element
    case "hide":
    default:
      message.classList.remove("hide");
      break;
  }
}

/**
 * toggles the Panel Control visibility
 *
 * @param {"show" | "hide"} action
 */
function togglePanelControlVisibility(action) {
  const allGameStartedItems = panelControl.querySelectorAll(".gameStarted");
  allGameStartedItems.forEach((item) => {
    if (action === "show") {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

/**
 * Checks whether a level has been selected.
 * If it has:
 * - Enables the "play" button
 * - If not, then keeps the button disabled
 *
 * @param {Event} event
 * @returns {void}
 */
function checkIfLevelIsSelected(event) {
  const valueSelected = event.target.value;

  let hasChosenValidLevel = false;
  switch (valueSelected) {
    case "1":
    case "2":
    case "3":
      hasChosenValidLevel = true;
      break;

    case "0":
    default:
      break;
  }

  // If the value is not a level that we want
  if (!hasChosenValidLevel) {
    reset();

    return;
  }

  btPlay.disabled = false;
  panelGame.style.display = "grid";
}

/**
 * Changes the Text content of the button
 *
 * @param {HTMLButtonElement} button
 * @param {string} newValue
 */
function changePlayButtonText(button, newValue) {
  button.textContent = newValue;
}

/**
 * @todo Para fazer na ficha 3
 */
function stopGame(button) {
  button.textContent = "Iniciar Jogo";
  btLevel.disabled = false;
  btLevel.value = "0";

  reset();
}

/**
 * @todo Para fazer na ficha 3
 */
function startGame(button) {
  button.textContent = "Terminar Jogo";
  btLevel.disabled = true;
  togglePanelControlVisibility("show");
  toggleTheMessageVisibility("hide");
}

/**
 * Handles the click on the play button.
 *
 * - If the button has text content of "Iniciar Jogo",
 *  changes to "Terminar Jogo"
 * - Otherwise keep it as it is, or change to "Iniciar Jogo";
 *
 * @param {Event} event
 */
function handleOnClickOnPlayButton(event) {
  const button = event.target;
  const currentButtonText = button.textContent;

  switch (currentButtonText) {
    case "Iniciar Jogo":
      startGame(button);
      break;

    case "Terminar Jogo":
    default:
      stopGame(button);
      break;
  }
}

reset();

// All the events are added here at the bottom
btLevel.addEventListener("change", checkIfLevelIsSelected);
btPlay.addEventListener("click", handleOnClickOnPlayButton);
panelGame.addEventListener("click", () => {
  const hasNotStartedGame = btPlay.textContent === "Iniciar Jogo";

  debugger;

  if (hasNotStartedGame) {
    toggleTheMessageVisibility("show", "Clique em Iniciar Jogo, seu burro!");
  } else {
    toggleTheMessageVisibility("show", "Clique em Iniciar Jogo, seu burro!");
  }
});
