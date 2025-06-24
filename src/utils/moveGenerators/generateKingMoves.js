import { isOpponent, inBounds } from './helpers.js';

export function generateKingMoves(board, row, col, turn, castlingRights) {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr, newCol = col + dc;
    if (inBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target || isOpponent(turn, target)) {
        moves.push([newRow, newCol]);
      }
    }
  }

  // Add pseudo-legal castling (legality filtered in ChessEngine)
  const backRank = turn === 'w' ? 7 : 0;
  if (row === backRank && col === 4) {
    if (castlingRights[turn].kingside && board[backRank][5] === '' && board[backRank][6] === '') {
      moves.push([backRank, 6]);
    }
    if (castlingRights[turn].queenside && board[backRank][3] === '' && board[backRank][2] === '' && board[backRank][1] === '') {
      moves.push([backRank, 2]);
    }
  }

  return moves;
}
