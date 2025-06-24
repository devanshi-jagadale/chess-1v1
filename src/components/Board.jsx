import React from 'react';
import Square from './Square';
import '../styles/Board.css';

export default function Board({ board, onSquareClick, selectedSquare, possibleMoves }) {
  const isMoveSquare = (row, col) =>
    possibleMoves.some(([r, c]) => r === row && c === col);

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isSelected =
            selectedSquare &&
            selectedSquare[0] === rowIndex &&
            selectedSquare[1] === colIndex;

          const isPossibleMove = isMoveSquare(rowIndex, colIndex);

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              row={rowIndex}
              col={colIndex}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              isSelected={isSelected}
              isPossibleMove={isPossibleMove}
            />
          );
        })
      )}
    </div>
  );
}
