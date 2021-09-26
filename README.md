# Tic Tac Toe

## API

### Client -> Server messages

* readyToPlay
  * no parameters
* makeMove
  * x : 0, 1, or 2
  * y : 0, 1, or 2

### Server -> Client messages

* gameState
  * turn : one of true (your turn), false (other player's turn), null (between games)
  * board : list of 9 numbers, where 0 = empty, 1 = x, 2 = o
