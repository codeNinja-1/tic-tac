# Tic Tac Toe

## API

### Client -> Server messages

* readyToPlay
** no parameters
* makeMove
** x : 0, 1, or 2
** y : 0, 1, or 2

### Server -> Client messages

* gameState
** turn : one of "you", "other", "over"
** board : string of nine o, x, and _
