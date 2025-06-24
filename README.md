♟️ React Chess Game with Custom Chess Engine
A fully functional chess game built with React and a custom chess engine written entirely in JavaScript — no third-party chess libraries used.
The chess engine handles all move generation, legal move validation, check, checkmate, stalemate detection, castling rules, and pawn promotion.

🔥 Features
✅ Complete chess rule implementation:

Legal move generation

Check / checkmate detection

Stalemate detection

Castling logic

Pawn promotion

✅ Fully interactive UI with React

✅ Highlight selected pieces and valid moves

✅ Status bar showing game state (whose turn, check, checkmate, stalemate)

✅ Reset button to restart the game

✅ Clean separation between game logic (engine) and UI components

✅ Entirely custom chess engine — no chess.js or external libraries used for logic

🚀 Live Demo

🖥️ Tech Stack
Frontend: React (JavaScript)

Game Logic: Pure JavaScript chess engine

Deployment: Vercel 

📂 Project Structure
src/
  components/
    Board.js
    Square.js
    StatusBar.js
  utils/
    chessEngine.js
    moveGenerators/
      generatePawnMoves.js
      generateKnightMoves.js
      generateBishopMoves.js
      generateRookMoves.js
      generateQueenMoves.js
      generateKingMoves.js
      helpers.js
  App.js
  index.js
  styles/
    Board.css
    Square.css
    StatusBar.css

ChessEngine.js — complete core game logic.

Move Generators — separate move logic for each piece type.

Components — interactive frontend board and controls.

🛠️ Getting Started (Run Locally)
1️⃣ Clone the repo:
git clone https://github.com/YOUR_USERNAME/react-chess.git
cd react-chess

2️⃣ Install dependencies:
npm install

3️⃣ Run the development server:
npm start

4️⃣ Open browser at:
http://localhost:3000

🎯 Future Improvements
Add move history panel

Implement undo functionality

Improve UI/UX design with animations

Add sound effects

En passant move support

AI opponent using simple algorithms

🙋‍♀️ Author
Devanshi
[https://github.com/devanshi-jagadale]

⭐ Why This Project?
This project was built to demonstrate:

Deep understanding of algorithmic problem solving

Ability to implement complex rule-based systems from scratch

Clean frontend-backend separation in a single-page React app

Strong JavaScript proficiency without relying on external chess libraries