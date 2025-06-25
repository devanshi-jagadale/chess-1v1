import { evaluateBoard } from './evaluation.js';

export function minimax(engine, depth, isMaximizing) {
  if (depth === 0 || engine.isCheckmate() || engine.isStalemate()) {
    return { score: evaluateBoard(engine.getBoard()) };
  }

  let bestMove = null;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  const board = engine.getBoard();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = engine.getPiece(row, col);
      if (piece && engine.isTurn(piece)) {
        const moves = engine.generateMoves(row, col);
        for (const [toRow, toCol] of moves) {
          const backup = {
            from: [row, col],
            to: [toRow, toCol],
            captured: board[toRow][toCol],
            piece
          };

          engine.move(row, col, toRow, toCol);
          const result = minimax(engine, depth - 1, !isMaximizing);
          engine.board[toRow][toCol] = backup.captured;
          engine.board[row][col] = backup.piece;
          engine.turn = isMaximizing ? 'w' : 'b';

          if (isMaximizing) {
            if (result.score > bestScore) {
              bestScore = result.score;
              bestMove = { from: [row, col], to: [toRow, toCol] };
            }
          } else {
            if (result.score < bestScore) {
              bestScore = result.score;
              bestMove = { from: [row, col], to: [toRow, toCol] };
            }
          }
        }
      }
    }
  }

  return { move: bestMove, score: bestScore };
}
