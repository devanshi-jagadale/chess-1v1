import { isWhite, isBlack } from './moveGenerators/helpers.js';

const pieceValues = {
  p: -1, r: -5, n: -3, b: -3, q: -9, k: -100,
  P: 1, R: 5, N: 3, B: 3, Q: 9, K: 100
};

export function evaluateBoard(board) {
  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const base = pieceValues[piece] || 0;

        // Encourage central control (positions [3–4][3–4])
        const centerBonus = (row >= 2 && row <= 5 && col >= 2 && col <= 5) ? 0.1 : 0;

        score += base + (isWhite(piece) ? centerBonus : -centerBonus);
      }
    }
  }

  return score;
}

