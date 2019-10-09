var board;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
]

const cells = document.querySelectorAll('.cell');
startOption();

function startOption() {
	document.querySelector(".endgame").style.display = "none";
	document.querySelector(".startgame").style.display = "block";
}

function startGame(huStart=true) {
	// take away the endgame screen
	document.querySelector(".startgame").style.display = "none";
	
	// creates an array of 9 for the board
	board = Array.from(Array(9).keys());

	// clear board
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}

	// if ai starts, place randomly in squares 0-8
	// if (!huStart) turn(Math.floor(Math.random() * 9), aiPlayer)
	if (!huStart) turn(4, aiPlayer)
}

function turnClick(square) {
	// checks to make sure the square is empty
	if (typeof board[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(board, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	// update board array
	board[squareId] = player;
	// update display
	document.getElementById(squareId).innerText = player;
	// check win
	let gameWon = checkWin(board, player)
	if (gameWon) {
		gameOver(gameWon)
	} else {
		checkTie()
	}

}

function checkWin(board, player) {
	// get an array of all squares marked by the player
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		// check if player marked every spot needed to win
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			// create a gameWon object
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	// color the winning combo
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}

	// remove click functionality after game ends
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(message) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = message;
}

function emptySquares() {
	// return array of empty squares
	return board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(board, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		// game is tied if there are no more empty squares
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tied!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	// recursive function
	var emptySpots = emptySquares();

	// declare base cases
	if (checkWin(newBoard, huPlayer)) {
		// human wins; bad
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		// AI wins; good
		return {score: 10};
	} else if (emptySpots.length === 0) {
		// tie; neutral
		return {score: 0};
	}

	var moves = [];
	for (var i = 0; i < emptySpots.length; i++) {
		var move = {};
		move.index = newBoard[emptySpots[i]];
		newBoard[emptySpots[i]] = player;

		// make recursive calls of every possible scenario
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[emptySpots[i]] = move.index;
		moves.push(move);
	}

	// decide on the best move
	var bestMove;
	if(player === aiPlayer) {
		// arbitrary minimum value
		var bestScore = -999999;
		// look for move with highest score (best case)
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		// arbitrary maximum value
		var bestScore = 999999;
		// look for move with lowest score (worst case)
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
