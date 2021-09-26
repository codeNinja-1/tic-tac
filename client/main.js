var socket = io();  // test

socket.on("gameState", function(turn, board, winner) {
  setGameState({turn:turn, board:board, winner:winner});
});

function setGameState(data) {
  state_you.style.display = "none";
  state_other.style.display = "none";
  state_none.style.display = "none";
  state_done_smile.style.display = "none";
  state_done_frown.style.display = "none";

 // Update the communicatin of the state of the game.
  if (winner != null) {
    if (winner == "other") {
      state_done_frown.style.display = "block";
    } else {
      state_done_smile.style.display = "block";
    }
  } else {
      if (data.turn == true) {
        state_you.style.display = "block";
      } else if (data.turn == false) {
        state_other.style.display = "block";
      } else {
        state_none.style.display = "block";
      }
    }

    for (var row = 0; row < 3; ++row) {
      for (var col = 0; col < 3; ++col) {
        var val = data.board[row * 3 + col];
        var img = gameboard.rows[row].cells[col].firstChild;
        if (val == "x") {
          img.src = "newx.svg";
        } else if (val == "o"){
          img.src = "newo.svg";
        } else {
          img.src = "";
        }
      }
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
      var img = document.createElement("img");
      cell.appendChild(img);
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
