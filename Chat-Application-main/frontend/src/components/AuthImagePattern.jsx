import { useState } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if the cell is already filled or there's a winner

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("Tie"); // If all cells are filled and no winner, it's a tie
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const getCellStyle = (value) => {
    if (value === "X") return "text-red-500 text-5xl";
    if (value === "O") return "text-blue-500 text-5xl";
    return "";
  };

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl flex items-center justify-center font-bold cursor-pointer bg-primary/10 hover:bg-primary/20 transition-all duration-300 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              onClick={() => handleClick(i)}
            >
              <span className={getCellStyle(board[i])}>{board[i]}</span>
            </div>
          ))}
        </div>

        {winner ? (
          <div className="mb-4 text-lg font-bold">
            {winner === "Tie" ? "It's a Tie!" : `${winner} Wins the Game!`}
          </div>
        ) : (
          <h2 className="text-2xl font-bold mb-4">
            {title || `Next Player: ${isXNext ? "X" : "O"}`}
          </h2>
        )}

        <p className="text-base-content/60 mb-4">{subtitle}</p>

        {winner && (
          <button
            onClick={resetGame}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthImagePattern;
