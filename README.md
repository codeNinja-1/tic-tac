# Tic Tac Toe

## Usage

```sh
# Install
git clone https://github.com/codeNinja-1/tic-tac.git && cd tic-tac && npm install
# Run
node server/server.js
```

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
  * winner : one of "you", "other", "tie", or null (nobody has won yet)
