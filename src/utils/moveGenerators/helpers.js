export function isWhite(piece) {
  return piece === piece?.toUpperCase();
}

export function isBlack(piece) {
  return piece === piece?.toLowerCase();
}

export function isOpponent(turn, piece) {
  if (!piece) return false;
  return (turn === 'w' && isBlack(piece)) || 
         (turn === 'b' && isWhite(piece));
}

export function inBounds(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}
