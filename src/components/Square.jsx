import React from 'react';
import '../styles/Square.css';

export default function Square({ piece, row, col, onClick, isSelected, isPossibleMove }) {
  const isDark = (row + col) % 2 === 1;
  const classNames = [
    'square',
    isDark ? 'dark' : 'light',
    isSelected ? 'selected' : '',
    isPossibleMove ? 'possible' : ''
  ].join(' ');

  const symbols = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
  };

  const display = symbols[piece] || '';

  return (
    <div className={classNames} onClick={() => onClick(row, col)}>
      {display}
    </div>
  );
}
