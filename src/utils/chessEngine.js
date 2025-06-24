import { generatePawnMoves } from './moveGenerators/generatePawnMoves.js';
import { generateKnightMoves } from './moveGenerators/generateKnightMoves.js';
import { generateBishopMoves } from './moveGenerators/generateBishopMoves.js';
import { generateRookMoves } from './moveGenerators/generateRookMoves.js';
import { generateQueenMoves } from './moveGenerators/generateQueenMoves.js';
import { generateKingMoves } from './moveGenerators/generateKingMoves.js';
import { isWhite, isBlack, isOpponent } from './moveGenerators/helpers.js';

export class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.board = [
      ['r','n','b','q','k','b','n','r'],
      ['p','p','p','p','p','p','p','p'],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['P','P','P','P','P','P','P','P'],
      ['R','N','B','Q','K','B','N','R'],
    ];
    this.turn = 'w';
    this.castlingRights = {
      w: { kingside: true, queenside: true },
      b: { kingside: true, queenside: true }
    };
  }

  getBoard() {
    return this.board;
  }

  getPiece(row, col) {
    return this.board[row][col];
  }

  isTurn(piece) {
    if (!piece) return false;
    return (this.turn === 'w' && isWhite(piece)) || (this.turn === 'b' && isBlack(piece));
  }

  generatePseudoLegalMoves(row, col) {
    const piece = this.board[row][col];
    if (!piece || !this.isTurn(piece)) return [];

    const lower = piece.toLowerCase();
    if (lower === 'p') return generatePawnMoves(this.board, row, col, this.turn);
    if (lower === 'n') return generateKnightMoves(this.board, row, col, this.turn);
    if (lower === 'b') return generateBishopMoves(this.board, row, col, this.turn);
    if (lower === 'r') return generateRookMoves(this.board, row, col, this.turn);
    if (lower === 'q') return generateQueenMoves(this.board, row, col, this.turn);
    if (lower === 'k') return generateKingMoves(this.board, row, col, this.turn, this.castlingRights);

    return [];
  }

  generateMoves(row, col) {
    const candidates = this.generatePseudoLegalMoves(row, col);
    const legalMoves = [];

    for (const [toRow, toCol] of candidates) {
      if (this.isLegalMove(row, col, toRow, toCol)) {
        legalMoves.push([toRow, toCol]);
      }
    }
    return legalMoves;
  }

  isLegalMove(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    const captured = this.board[toRow][toCol];

    // simulate move
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = '';

    const kingSafe = !this.isInCheck(this.turn);

    // undo move
    this.board[fromRow][fromCol] = piece;
    this.board[toRow][toCol] = captured;

    return kingSafe;
  }

  isInCheck(turn) {
    const [kRow, kCol] = this.findKing(turn);
    return this.isSquareUnderAttack(kRow, kCol, turn);
  }

  isSquareUnderAttack(row, col, turn) {
    const opponent = turn === 'w' ? 'b' : 'w';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece) continue;
        if ((opponent === 'w' && isWhite(piece)) || (opponent === 'b' && isBlack(piece))) {
          const moves = this.generateOpponentMoves(r, c, opponent);
          for (const [tr, tc] of moves) {
            if (tr === row && tc === col) return true;
          }
        }
      }
    }
    return false;
  }

  generateOpponentMoves(row, col, turn) {
    const piece = this.board[row][col];
    if (!piece) return [];

    const lower = piece.toLowerCase();
    if (lower === 'p') return generatePawnMoves(this.board, row, col, turn);
    if (lower === 'n') return generateKnightMoves(this.board, row, col, turn);
    if (lower === 'b') return generateBishopMoves(this.board, row, col, turn);
    if (lower === 'r') return generateRookMoves(this.board, row, col, turn);
    if (lower === 'q') return generateQueenMoves(this.board, row, col, turn);
    if (lower === 'k') {
      // IMPORTANT: opponent king pseudo-moves without castling
      return generateKingMoves(this.board, row, col, turn, { w: {}, b: {} });
    }
    return [];
  }

  findKing(turn) {
    const target = turn === 'w' ? 'K' : 'k';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c] === target) return [r, c];
      }
    }
    return null;
  }

  move(fromRow, fromCol, toRow, toCol) {
    const legalMoves = this.generateMoves(fromRow, fromCol);
    if (!legalMoves.some(([r, c]) => r === toRow && c === toCol)) return false;

    const piece = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = '';

    // Handle castling
    if (piece === 'K') {
      this.castlingRights.w.kingside = false;
      this.castlingRights.w.queenside = false;
      if (fromRow === 7 && fromCol === 4 && toRow === 7 && toCol === 6) { 
        this.board[7][5] = 'R'; 
        this.board[7][7] = '';
      }
      if (fromRow === 7 && fromCol === 4 && toRow === 7 && toCol === 2) { 
        this.board[7][3] = 'R'; 
        this.board[7][0] = '';
      }
    }
    if (piece === 'k') {
      this.castlingRights.b.kingside = false;
      this.castlingRights.b.queenside = false;
      if (fromRow === 0 && fromCol === 4 && toRow === 0 && toCol === 6) { 
        this.board[0][5] = 'r'; 
        this.board[0][7] = '';
      }
      if (fromRow === 0 && fromCol === 4 && toRow === 0 && toCol === 2) { 
        this.board[0][3] = 'r'; 
        this.board[0][0] = '';
      }
    }

    // Handle rook moves (affects castling rights)
    if (piece === 'R') {
      if (fromRow === 7 && fromCol === 0) this.castlingRights.w.queenside = false;
      if (fromRow === 7 && fromCol === 7) this.castlingRights.w.kingside = false;
    }
    if (piece === 'r') {
      if (fromRow === 0 && fromCol === 0) this.castlingRights.b.queenside = false;
      if (fromRow === 0 && fromCol === 7) this.castlingRights.b.kingside = false;
    }

    // Pawn promotion
    if (piece === 'P' && toRow === 0) this.board[toRow][toCol] = 'Q';
    if (piece === 'p' && toRow === 7) this.board[toRow][toCol] = 'q';

    // Turn change
    this.turn = this.turn === 'w' ? 'b' : 'w';
    return true;
  }

  isCheckmate() {
    return this.isInCheck(this.turn) && this.noLegalMoves();
  }

  isStalemate() {
    return !this.isInCheck(this.turn) && this.noLegalMoves();
  }

  noLegalMoves() {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece || !this.isTurn(piece)) continue;
        if (this.generateMoves(r, c).length > 0) return false;
      }
    }
    return true;
  }
}
