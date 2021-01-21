// import React from 'react';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const emptyBoard = Array(9).fill("");
        // const emptyBoard = [
        //   "0", "X", "Y",
        //   "0", "X", "Y",
        //   "0", "X", "Y",
        // ];
  const[board, setBoard] = useState(emptyBoard);
  const[currentPlayer, setCurrentPlayer] = useState("O");
  const[winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if(winner) {
      alert("O jogo já terminou");
      return null;
    }

    if(board[index] !== "") {
      alert("Esta posição já foi marcada");
      return null;
    }

    setBoard(
      board.map((item, itemIndex) => itemIndex === 
      index ? currentPlayer : item)
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]], 
    ];

    possibleWaysToWin.forEach(cells => {
      // if(cells.every(cell => cell === "O")) alert("O(zero) venceu");
      // if(cells.every(cell => cell === "X")) alert("X venceu");
      if(cells.every(cell => cell === "O")) setWinner("O");
      if(cells.every(cell => cell === "X")) setWinner("X");
    });

    checkDraw();
    
  }

  const checkDraw = () => {
    if(board.every(item => item !== "")) setWinner("E");
  }

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    // <div className="App">
    //     <p className="texto">
    //       Olá Arthur :-)
    //     </p>
    // </div>
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div 
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
        ))}
      </div>
      {winner &&    
        <div className="footer">
          {winner === "E" ?
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
          :
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          }
          <button onClick={resetGame}>Recomeçar o jogo</button>
        </div>
      }
    </main>
  );
}

export default App;