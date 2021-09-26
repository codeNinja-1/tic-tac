var socket = io();

socket.on("gameState", function(turn, board, winner) {
  setGameState({turn:turn, board:board});
});

function setGameState(data) {
  state_you.style.display = "none";
  state_other.style.display = "none";
  state_none.style.display = "none";

  if (data.turn == true) {
    state_you.style.display = "block";
  } else if (data.turn == false) {
    state_other.style.display = "block";
  } else {
    state_none.style.display = "block";
  }
}

function readyToPlay() {
  data = {};

  socket.emit("readyToPlay");
}

function makeMove(x, y) {
  var data = {
    "x" : x,
    "y" : y,
  }

  socket.emit("makeMove", x, y);
}

function clickCell(event) {
  makeMove(event.target.col, event.target.row);
}

function init() {
  for (var row = 0; row < 3; ++row) {
    for (var col = 0; col < 3; ++col) {
      var cell = gameboard.rows[row].cells[col];
      cell.row = row;
      cell.col = col;
      cell.addEventListener("click", clickCell);
    }
  }

  setGameState({
    "turn" : null,
    "board" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  });
}
