var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			} else {
				arr[i][j].innerText = '';
			}
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest();
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response);
		console.log(response);
		board = response.board;
		FillBoard(board);
	};
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy');
	// The allowed values for difficulty are easy, medium, hard, and random
	xhrRequest.send();
};

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
	// FillBoard(board);
};

function isSafe(board, row, col, num) {
	for (let x = 0; x < 9; x++) {
		if (board[row][x] == num) return false;
	}
	for (let x = 0; x < 9; x++) {
		if (board[x][col] == num) return false;
	}
	let startRow = row - (row % 3);
	let startCol = col - (col % 3);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i + startRow][j + startCol] == num) return false;
		}
	}

	return true;
}

function SudokuSolver(board, row, col, n) {
	if (row == n) {
		FillBoard(board);
		return true;
	}
	if (col == n) {
		return SudokuSolver(board, row + 1, 0, n);
	}
	if (board[row][col] != 0) {
		return SudokuSolver(board, row, col + 1, n);
	}
	for (let num = 1; num <= 9; num++) {
		if (isSafe(board, row, col, num)) {
			board[row][col] = num;
			if (SudokuSolver(board, row, col + 1, n)) {
				return true;
			}
			board[row][col] = 0;
		}
	}
	return false;
}
