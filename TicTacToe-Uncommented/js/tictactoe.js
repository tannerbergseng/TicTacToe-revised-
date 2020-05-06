let activePlayer = "X";
let selectedSquares = [];

function insertXOrO(squareNumber) {
	if (!selectedSquares.some(element => element.includes(squareNumber))) {
		let select = document.getElementById(squareNumber);
		insertImage(squareNumber, select);
		checkWinConditions();
		changeActivePlayer();
		sound("place-x-or-o-sound");
	}
}

function insertImage(squareNumber, select) {
	if (activePlayer == "X") {
		select.style.backgroundImage = 'url("images/o.png")'
	} else {
		select.style.backgroundImage = 'url("images/x.png")'
	}
	selectedSquares.push(squareNumber + activePlayer);
}

function checkWinConditions() {
	if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
	else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
	else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
	else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
	else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
	else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
	else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
	else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }

	else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
	else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
	else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
	else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
	else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
	else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
	else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
	else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
	else { checkForTie() }

	function arrayIncludes(squareA, squareB, squareC) {
		const a = selectedSquares.includes(squareA)
		const b = selectedSquares.includes(squareB)
		const c = selectedSquares.includes(squareC)
		console.log(a,b,c)
		if (a == true && b == true && c == true) { return true }
	}

	function checkForTie() {
		if (selectedSquares.length >= 9) {
			sound("tie-game-sound");
			setTimeout(function () { resetGame(); }, 300);
		}
	}
}

function changeActivePlayer() {
	if (activePlayer == "X") {
		activePlayer = "O";
	} else {
		activePlayer = "X";
	}
}

function resetGame() {
	for (let i = 0; i < 9; i++) {
		let square = document.getElementById(String(i))
		square.style.backgroundImage = ""
	}
	selectedSquares = [];
}

function sound(audioId) {
	let sound = document.getElementById(audioId);
	sound.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
	const canvas = document.getElementById('win-lines')
	const c = canvas.getContext('2d');

	let x1 = coordX1;
	let y1 = coordY1;
	let x2 = coordX2;
	let y2 = coordY2;
	let x = x1
	let y = y1

	function animateLineDrawing() {
		const animationLoop = requestAnimationFrame(animateLineDrawing);
		c.clearRect(0, 0, 608, 608)

		c.beginPath();
		c.moveTo(x1, y1)
		c.lineTo(x, y)
		c.lineWidth = 10;
		c.strokeStyle = "rgba(70, 255, 33, .8)";
		c.stroke();

		if (x1 <= x2 && y1 >= y2) {
			if (x < x2) { x += 10; }
			if (y > y2) { y -= 10; }
			if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
		}
		if (x1 <= x2 && y1 <= y2) {
			if (x < x2) { x += 10; }
			if (y < y2) { y += 10; }
			if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
		}
	}
	function clear() {
		const animationLoop = requestAnimationFrame(clear);
		c.clearRect(0, 0, 608, 608);
		cancelAnimationFrame(animationLoop);
	}
	sound("winner-sound");
	animateLineDrawing();
	setTimeout(function () { clear(); resetGame(); }, 1000);
}