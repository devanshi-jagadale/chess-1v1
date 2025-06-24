import { generateRookMoves } from './generateRookMoves.js';
import { generateBishopMoves } from './generateBishopMoves.js';

export function generateQueenMoves(board, row, col, turn) {
  return [
    ...generateRookMoves(board, row, col, turn),
    ...generateBishopMoves(board, row, col, turn)
  ];
}
