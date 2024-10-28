import React from 'react';
import './App.css';
import { useState } from 'react';


/***********************************************************************************
 Component Square - represents a square in the board
 Gets prop value - the value of the square
 Gets prop onSquareClick - a function to call when the square is clicked
 Gets prop highlight - a boolean to highlight the square if it is in the winning line
 Return: a button that displays the square's value and calls onSquareClick when clicked 
***********************************************************************************/
function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={`square ${highlight ? "highlight" : ""}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}


/***********************************************************************************
 Component Board - represents the board of the game - 9 squares
 Gets prop xIsNext - whether it's X's turn or O's turn
 Gets prop squares - the current state of the board, current squares value
 Gets prop onPlay - a function to call when a square is clicked to update
 the game
 Return: a board made up of 9 squares, player's turn or the winner
***********************************************************************************/
function Board({ xIsNext, squares, onPlay }) {

  // function that do something if the square is clicked
  function handleClick(i) {
    let choosenSquare = squares[i]
    if (choosenSquare || checkWinner(squares)) {
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

  // check if there is a winner - if winnerData is null there is no winner
  // else there is a winner
  // if there is a winner, highlights the winnering squares
  const winner = checkWinner(squares);
  const winningLine = checkWinningLine(squares);

  // displays or player's turn or the winner or a draw
  let status;
  if (winner) {
    status = "The winner is : " + winner;
    // there is a draw when there is no winner and the board is filled
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // design-what we see on the screen
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={winningLine.includes(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={winningLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={winningLine.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={winningLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={winningLine.includes(8)} />
      </div>
  </>
  );
}



/***********************************************************************************
 Component Game - represents a game, contains the board, the game's infos
 and history
 Return: a game with a board and some info about the game
***********************************************************************************/
export default function Game() {

  // list of past moves
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // which step the user is currently viewing
  const [currentMove, setCurrentMove] = useState(0);

  // to know whose turn it is
  const xIsNext = currentMove % 2 === 0;

  // value of the current squares
  const currentSquares = history[currentMove];

  // function that will be called by the Board component
  // to update the game when a square is cliqued
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function called when the user clicks on a move button
  // It updates the currentMove to be the move clicked
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // The .map() function is used to iterate over the history array, and
  // for each move in the game, it returns a <li> element containing a button
  // that has an onClick handler which calls the function jumpTo 
  const moves = history.map((squares, move) => {
    let description;
    // Move is the index of the current item in the history array, representing 
    // how many moves have been made so far
    if (move > 0) {
      description = 'Go to move ' + move;
    } else {
      description = 'Go to game start';
    }
    // Check if this is the current move
    if (move === currentMove) {
      return (
        <li key={move}>
          <p>You are at move {move}</p>
        </li>
      );
    } else {
      return (
        // the key of each element is the move number
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-box"> {/* container for board and moves */}
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol className="no-numbers">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

const possibleWinningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinningLine(squares){
    for (let i = 0; i < possibleWinningLines.length; i++) {
      const [a, b, c] = possibleWinningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }  
  return [];
}
function checkWinner(squares) {
  let winningLine = checkWinningLine(squares);
  if (winningLine.length > 0) {
    return squares[winningLine[0]]
  }
  return null;
}