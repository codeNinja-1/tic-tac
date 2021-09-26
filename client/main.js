function init() {
  for (var row = 0; row < 3; ++row) {
    for (var col = 0; col < 3; ++col) {
      gameboard.rows[row].cells[col].innerHTML = row + "," + col;
    }
  }
}
