import React from 'react';
import '../styles/StatusBar.css';

export default function StatusBar({ status, onReset }) {
  return (
    <div className="status-bar">
      <h2>{status}</h2>
      <button onClick={onReset} className="reset-btn">Reset Game</button>
    </div>
  );
}
