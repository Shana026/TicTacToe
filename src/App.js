import React from 'react';
import './App.css';
import { useState } from 'react';


/***********************************************************************
 Component Square - represents a square in the board
 Gets prop value - the value of the square
 Gets prop onSquareClick - a function to call when the square is clicked
 Return: a button that displays the square's value and calls
 onSquareClick when clicked 
***********************************************************************/
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


/************************************************************************
 Component Board - represents the board of the game - 9 squares
 Gets prop xIsNext - whether it's X's turn or O's turn
 Gets prop squares - the current state of the board, current squares value
 Gets prop onPlay - a function to call when a square is clicked to update
 the game
 Return: a board made up of 9 squares, title, player's turn or the winner
************************************************************************/
function Board({ xIsNext, squares, onPlay }) {

  // function that do something if the square is clicked
  function handleClick(i) {
    // check if the choosen square is already selected and if there is a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // copy of squares array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // update the game
    onPlay(nextSquares);
  }

  // displays player's turn or the winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // design-what we see on the screen
  return (
    <>
    <h1>TicTacToe</h1>
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
  </>
  );
}


/************************************************************************
 Component Game - represents a game, contains the board, the game's infos
 and history
 Return: a game with a board and some info about the game
************************************************************************/
export default function Game() {

  // to know whose turn it is
  const [xIsNext, setXIsNext] = useState(true);
  // list of past moves
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // value of the current squares
  const currentSquares = history[history.length - 1];

  // function that will be called by the Board component
  // to update the game when a square is cliqued
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

// check if there's a winner or not and returns it
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}