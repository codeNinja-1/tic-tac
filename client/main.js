var socket = io();  // test at 9:42

socket.on("gameState", function(turn, board, winner) {
  setGameState({turn:turn, board:board, winner:winner});
});

function setGameState(data) {
  state_you.style.display = "none";
  state_other.style.display = "none";
  state_none.style.display = "none";
  state_win.style.display = "none";
  state_loss.style.display = "none";
  state_tie.style.display = "none";

 // Update the communicatin of the state of the game.
  if (data.winner != null) {
    if (data.winner == "other") {
      state_loss.style.display = "block";
    } else if(data.winner == "you") {
      state_win.style.display = "block";
    } else {
      state_tie.style.display = "block";
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

    console.log("setGameState", data)
    for (var row = 0; row < 3; ++row) {
      for (var col = 0; col < 3; ++col) {
        var val = data.board[row * 3 + col];
        var img = gameboard.rows[row].cells[col].firstChild;
        console.log(img, val);
        if (val == 1) {
          img.src = "assets/newx.svg";
        } else if (val == 2){
          img.src = "assets/newo.svg";
        } else {
          img.src = "";
        }
      }
    }
  }

function readyToPlay() {
  data = {};

  console.log("Ready to play");

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
