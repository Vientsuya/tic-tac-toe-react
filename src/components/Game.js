import { useState } from "react";

import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  let currentSquares = history[currentMove];

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    setxIsNext(nextMove % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const handlePlay = (newSquares) => {
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setxIsNext(!xIsNext);
  };
  return (
    <div className="container">
      <div className="game">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
