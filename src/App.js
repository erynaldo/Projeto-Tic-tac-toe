// import React from 'react';
// import React, { useState, useEffect } from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css';

function App() {
  const tabuleiroVazio = Array(9).fill("");
        // const tabuleiroVazio = [
        //   "0", "X", "Y",
        //   "0", "X", "Y",
        //   "C", "B", "A",
        // ];
  const[tabuleiro, definirTabuleiro] = useState(tabuleiroVazio);
  const[jogadorAtual, definirJogadorAtual] = useState("O");
  const[vencedor, definirVencedor] = useState(null);

  const celulaClick = (indice) => {
    if(vencedor) {
      alert("O jogo já terminou");
      return null;
    }

    if(tabuleiro[indice] !== "") {
      alert("Esta posição já foi marcada");
      return null;
    }

    definirTabuleiro(
      tabuleiro.map((item, itemIndice) => itemIndice === 
      indice ? jogadorAtual : item)
    );

    definirJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  }

  const verificarVencedor = () => {
    const possiveisFormasGanhar = [
      [tabuleiro[0], tabuleiro[1], tabuleiro[2]],
      [tabuleiro[3], tabuleiro[4], tabuleiro[5]],
      [tabuleiro[6], tabuleiro[7], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[3], tabuleiro[6]],
      [tabuleiro[1], tabuleiro[4], tabuleiro[7]],
      [tabuleiro[2], tabuleiro[5], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[4], tabuleiro[8]],
      [tabuleiro[2], tabuleiro[4], tabuleiro[6]], 
    ];

    possiveisFormasGanhar.forEach(celulas => {
      // if(cells.every(cell => cell === "O")) alert("O(zero) venceu");
      // if(cells.every(cell => cell === "X")) alert("X venceu");
      if(celulas.every(celula => celula === "O")) definirVencedor("O");
      if(celulas.every(celula => celula === "X")) definirVencedor("X");
    });

    verificarSorteio();
    
  }

  const verificarSorteio = () => {
    if(tabuleiro.every(item => item !== "")) definirVencedor("E");
  }

  useEffect(verificarVencedor, [tabuleiro]);

  const resetGame = () => {
    definirJogadorAtual("O");
    definirTabuleiro(tabuleiroVazio);
    definirVencedor(null);
  }

  return (
    // <div className="App">
    //     <p className="texto">
    //       Olá Arthur :-)
    //     </p>
    // </div>
    <main>
      <h1 className="titulo">Jogo da Velha</h1>

      <div className={`tabuleiro ${vencedor ? "game-over" : ""}`}>
        {tabuleiro.map((item, indice) => (
          <div 
            key={indice}
            className={`celula ${item}`}
            onClick={() => celulaClick(indice)}
            >
              {item}
            </div>
        ))}
      </div>
      {vencedor &&    
        <div className="footer">
          {vencedor === "E" ?
            <h2 className="mensagem-vencedor">
              <span className={vencedor}>Empatou!</span>
            </h2>
          :
            <h2 className="mensagem-vencedor">
              <span className={vencedor}>{vencedor}</span> venceu!
            </h2>
          }
          <button onClick={resetGame}>Novo jogo</button>
        </div>
      }
    </main>
  );
}

export default App;