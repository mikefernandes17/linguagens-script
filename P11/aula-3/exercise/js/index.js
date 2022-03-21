"use strict";

// declaracao de constantes
const message = document.querySelector("#message");
const panelControl = document.getElementById("panel-control");
const panelGame = document.querySelector("#panel-game");
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");

// declarar a funcao reset
function reset() {
  panelGame.style.display = "none";

  message.textContent = "";
  message.classList.remove("hide");

  const allGameStartedItems = panelControl.querySelectorAll(".gameStarted");
  allGameStartedItems.forEach(function (item) {
    item.classList.add("hide");
  });

  // Ir buscar o btLevel
  // Se o btLevel.value for igual a 0, entao desabilitar o botao
  // Caso contrário, fica habilitado
}

reset();
checkIfLevelIsSelected();

function checkIfLevelIsSelected() {
  const hasNoOptionSelected = btLevel.value === "0";

  if (hasNoOptionSelected) {
    btPlay.disabled = "true";
  }
}

btLevel.addEventListener("change", (event) => {
  const valueSelected = event.target.value;

  if (valueSelected !== "0") {
    btPlay.disabled = "false";
  }
});

// invocar a funcao reset

// start
// end
// event listeners
