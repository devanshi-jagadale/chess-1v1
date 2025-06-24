import { isWhite, isOpponent, inBounds } from './helpers.js';

export function generatePawnMoves(board, row, col, turn) {
  const moves = [];
  const piece = board[row][col];
  const dir = isWhite(piece) ? -1 : 1;
  const startRow = isWhite(piece) ? 6 : 1;

  // Forward move
  if (inBounds(row + dir, col) && board[row + dir][col] === '') {
    moves.push([row + dir, col]);

    // Double forward from start
    if (row === startRow && board[row + 2 * dir][col] === '') {
      moves.push([row + 2 * dir, col]);
    }
  }

  // Captures
  for (let dc of [-1, 1]) {
    const newCol = col + dc;
    if (inBounds(row + dir, newCol)) {
      const target = board[row + dir][newCol];
      if (target && isOpponent(turn, target)) {
        moves.push([row + dir, newCol]);
      }
    }
  }

  // En passant logic will be added later

  return moves;
}
