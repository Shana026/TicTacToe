# Tic-Tac-Toe Game

## Overview

This project is a Tic-Tac-Toe game built with React. The game allows two players to play Tic-Tac-Toe, tracks the game’s history, and lets users review and jump back to previous moves.

### Features

- Play a classic 3x3 Tic-Tac-Toe game.
- Player Turn Indicator: The game displays whose turn it is (either "X" or "O").
- Winner Announcement: Once a player wins, the game announces the winner and highlights the winning combination.
- Game History: As the game progresses, a move history is recorded.
- Time Travel: Players can go back and view previous board states or resume the game from a past move.


## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Steps

1. Clone the repository: `git clone <https://github.com/Shana026/TicTacToe>`

2. Navigate to the project directory: `cd tic-tac-toe`
 
3. Install the dependencies: `npm install`

4. Start the development server: `npm start`

5. Open your browser and navigate to: `http://localhost:3000`

## How to Play

- Players take turns placing their mark ("X" or "O") on the 3x3 grid.
- The game will automatically switch turns after each valid move.
- The winner is determined when a player aligns three of their marks horizontally, vertically, or diagonally.
- If all squares are filled without a winner, the game ends in a draw.
- You can use the list of moves (displayed on the right side) to "time travel" through previous moves and review the game’s history.

## Code Structure

The project is composed of three main components:

1. Square Component
- Represents a single square on the Tic-Tac-Toe board.
- Handles user clicks to place a mark.

2. Board Component
- Represents the Tic-Tac-Toe board, composed of 9 Square components.
- Handles game logic, including tracking turns and checking for a winner.

3. Game Component
- Manages the overall game state, including the game’s history and the current move.
- Allows players to review the game’s history and jump back to previous moves.

  ### Enjoy !
