import { isOpponent, inBounds } from './helpers.js';

export function generateRookMoves(board, row, col, turn) {
  const moves = [];

  const directions = [
    [-1, 0], [+1, 0], [0, -1], [0, +1]
  ];

  for (const [dr, dc] of directions) {
    let newRow = row + dr;
    let newCol = col + dc;

    while (inBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target) {
        moves.push([newRow, newCol]);
      } else {
        if (isOpponent(turn, target)) {
          moves.push([newRow, newCol]);
        }
        break;
      }
      newRow += dr;
      newCol += dc;
    }
  }

  return moves;
}
