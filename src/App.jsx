import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import { ChessEngine } from './utils/chessEngine';
import { minimax } from './utils/minimax';
import './App.css';

export default function App() {
  const [engine] = useState(new ChessEngine());
  const [board, setBoard] = useState(engine.getBoard().map(row => [...row]));
  const [selected, setSelected] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [status, setStatus] = useState("White to move");
  const [mode, setMode] = useState("human"); // "human" or "ai"

  useEffect(() => {
    if (mode === "ai" && engine.turn === 'b') {
      setTimeout(makeAIMove, 300);
    }
  }, [board, mode]);

  const updateStatus = () => {
    if (engine.isCheckmate()) {
      const winner = engine.turn === 'w' ? 'Black' : 'White';
      setStatus(`Checkmate! ${winner} wins`);
    } else if (engine.isStalemate()) {
      setStatus("Stalemate! It's a draw.");
    } else if (engine.isInCheck(engine.turn)) {
      const player = engine.turn === 'w' ? 'White' : 'Black';
      setStatus(`${player} is in check`);
    } else {
      const player = engine.turn === 'w' ? 'White' : 'Black';
      setStatus(`${player} to move`);
    }
  };

  const handleSquareClick = (row, col) => {
    if (engine.turn === 'b' && mode === 'ai') return; // disable clicking when AI is thinking

    if (selected) {
      const [selRow, selCol] = selected;
      const moveSuccess = engine.move(selRow, selCol, row, col);
      if (moveSuccess) {
        setBoard(engine.getBoard().map(row => [...row]));
        updateStatus();
      }
      setSelected(null);
      setPossibleMoves([]);
    } else {
      const piece = engine.getPiece(row, col);
      if (piece && engine.isTurn(piece)) {
        const moves = engine.generateMoves(row, col);
        setSelected([row, col]);
        setPossibleMoves(moves);
      }
    }
  };

  const makeAIMove = () => {
    const { move } = minimax(engine, 2, false);
    if (move) {
      engine.move(...move.from, ...move.to);
      setBoard(engine.getBoard().map(row => [...row]));
      updateStatus();
    }
  };

  const handleReset = () => {
    engine.reset();
    setBoard(engine.getBoard().map(row => [...row]));
    setSelected(null);
    setPossibleMoves([]);
    setStatus("White to move");
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    handleReset(); // reset game on mode change
  };

  return (
    <div className="app">
      <h1>Chess</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="mode">Game Mode: </label>
        <select id="mode" value={mode} onChange={handleModeChange}>
          <option value="human">🧍 vs 🧍 Human vs Human</option>
          <option value="ai">🧍 vs 🤖 Human vs Computer</option>
        </select>
      </div>

      <StatusBar status={status} onReset={handleReset} />
      <Board 
        board={board} 
        onSquareClick={handleSquareClick}
        selectedSquare={selected}
        possibleMoves={possibleMoves}
      />
    </div>
  );
}
