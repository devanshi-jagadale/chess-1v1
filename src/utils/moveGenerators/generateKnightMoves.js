import { isOpponent, inBounds } from './helpers.js';

export function generateKnightMoves(board, row, col, turn) {
  const moves = [];
  const jumps = [
    [-2, -1], [-2, +1],
    [-1, -2], [-1, +2],
    [+1, -2], [+1, +2],
    [+2, -1], [+2, +1]
  ];

  for (const [dr, dc] of jumps) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (inBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target || isOpponent(turn, target)) {
        moves.push([newRow, newCol]);
      }
    }
  }

  return moves;
}
