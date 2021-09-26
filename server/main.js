var express = require("express");
var app = express();

app.use(express.static(require("path").join(__dirname, "../client")));

var server = app.listen(3000);

var io = require("socket.io")(server);

class Player {
  constructor(socket = null) {
    this.socket = socket;
  }
}

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.registerEvents(this.player1);
    this.registerEvents(this.player2);
    this.turn = Math.round(Math.random()) + 1;
    this.gameOver = false;
    this.winner = null;
    this.board = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
    // 0 = blank, 1 = player 1, 2 = player 2
  }
  play(player, position) {
    if (this.which(player) == this.turn && !this.gameOver) {
      if (this.board[position] == 0) {
        this.board[position] = this.which(player);
        this.turn = this.turn == 2 ? 1 : 2;
        let res = this.result();
        if (res != 0) {
          this.gameOver = true;
          this.winner = res;
        }
        this.sendBoard(player);
      }
    }
  }
  which(player) {
    return player == this.player1 ? 1 : this.player2 ? 2 : -1;
  }
  registerEvents(player) {
    var game = this;
    player.socket.on("makeMove", function(x, y) {
      game.play(player, x + y * 3);
    });
  }
  sendBoard() {
    this.player1.socket.emit("gameState", this.gameOver ? null : this.turn == 1, this.board, this.winner != null ? this.winner == 1 : null);
    this.player2.socket.emit("gameState", this.gameOver ? null : this.turn == 2, this.board, this.winner != null ? this.winner == 2 : null);
  }
  result() {
    let board = this.board;
    for (var i = 0;i < 3;i++) {
      if (board[i * 3] == board[i * 3 + 1] && board[i * 3] == board[i * 3 + 2] && board[i * 3] != 0) {
        return board[i * 3];
      }
    }
    for (var i = 0;i < 3;i++) {
      if (board[i] == board[i + 3] && board[i] == board[i + 6] && board[i] != 0) {
        return board[i];
      }
    }
    if (board[0] == board[4] && board[0] == board[8] && board[0] != 0) {
      return board[0];
    }
    if (board[2] == board[4] && board[2] == board[6] && board[2] != 0) {
      return board[2];
    }
    return 0;
  }
}

var unpaired = [];

io.on("connection", function(socket) {
  var player = new Player(socket);
  socket.on("readyToPlay", function() {
    unpaired.push(player);
    tryPair();
  });
});

function tryPair() {
  for (var i = 0; i < Math.floor(unpaired.length / 2) * 2; i += 2) {
    var game = new Game(unpaired[i], unpaired[i + 1]);
    unpaired.splice(i, 2);
  }
}
