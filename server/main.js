var express = require("express");
var app = express();

app.use(express.static("../client"));

var server = app.start(3000);

var io = require("socket.io")(app);

io.on("connection", function(socket) {
  
});
