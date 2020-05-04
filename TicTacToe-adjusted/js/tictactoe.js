var activePlayer = "Player 1";
var recordSquares = [];

function animateSquare(square) {
	if (!check(recordSquares, square)) {
		var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
		var selected = document.getElementById(square); // paint avatar
		if (paintAvatar == "O") { // change these all to ternary satetments instead
			animateO(selected); // call function to animate O
		} else {
			animateX(selected); // call function to animate X
		}
		// build new array adding the newly selected square and the assigned avatar
		recordSquares.push(square + paintAvatar);
		WinCheck();
		avatarPlaced(); // end current turn and pass the turn to the other player
		squareSound(); // play a game sound when the avatar is placed
	}
}

function check(recordSquares, square) {
	for (var i in recordSquares) {
		var temprecordSquares = recordSquares[i].charAt(0); // comparing index of square
		if (temprecordSquares == square) {
			return true;
		}
	}
}

function determineAvatar() {
	var paintAvatar;
	if (activePlayer == "Player 1") { // check which player is active and their corresponding avatar
		paintAvatar = "O";
	} else {
		paintAvatar = "X";
	}
	return paintAvatar; // returned back the correct avatar
}

function animateO(selected) {
	selected.style.backgroundImage = 'url("images/avatarO.gif")'
}

function animateX(selected) {
	selected.style.backgroundImage = 'url("images/avatarX.gif")'
}

function WinCheck() {
	if (inc('0X', '1X', '2X')) { drawLine(50, 100, 550, 100) }
	else if (inc('3X', '4X', '5X')) { drawLine(50, 300, 550, 300) }
	else if (inc('6X', '7X', '8X')) { drawLine(50, 500, 550, 500) }
	else if (inc('0X', '3X', '6X')) { drawLine(100, 50, 100, 550) }
	else if (inc('1X', '4X', '7X')) { drawLine(300, 50, 300, 550) }
	else if (inc('2X', '5X', '8X')) { drawLine(500, 50, 500, 550) }
	else if (inc('6X', '4X', '2X')) { drawLine(550, 100, 100, 550) }
	else if (inc('0X', '4X', '8X')) { drawLine(50, 100, 550, 500) }

	else if (inc('0O', '1O', '2O')) { drawLine(50, 100, 550, 100) }
	else if (inc('3O', '4O', '5O')) { drawLine(50, 300, 550, 300) }
	else if (inc('6O', '7O', '8O')) { drawLine(50, 500, 550, 500) }
	else if (inc('0O', '3O', '6O')) { drawLine(100, 50, 100, 550) }
	else if (inc('1O', '4O', '7O')) { drawLine(300, 50, 300, 550) }
	else if (inc('2O', '5O', '8O')) { drawLine(500, 50, 500, 550) }
	else if (inc('6O', '4O', '2O')) { drawLine(550, 100, 100, 550) }
	else if (inc('0O', '4O', '8O')) { drawLine(50, 100, 550, 500) }
	else { checkForTie() }

	function inc(var1, var2, var3) {
		var x = recordSquares.includes(var1)
		var y = recordSquares.includes(var2)
		var z = recordSquares.includes(var3)
		if (x == true && y == true && z == true) {
			return true
		} else {
			return false
		}
	}

	function checkForTie() {
		if (recordSquares.length >= 9) {
			tieSound(); // play a sound when a tie has been detected
			setTimeout(function () { resetGame(); }, 750);
		}
	}
}

function avatarPlaced() {
	if (activePlayer == "Player 1") { // once active player selects a square change the active player
		activePlayer = "Player 2";
	} else {
		activePlayer = "Player 1";
	}
}

function resetGame() {
	for (var i = 0; i < 9; i++) {
		var square = document.getElementById(String(i))
		square.style.backgroundImage = ''
	}
	recordSquares = []; // this clears the running log of all game moves
}

function squareSound() {
	var sound = document.getElementById("placeAvatar");
	sound.play();
}
function tieSound() {
	var sound = document.getElementById("tieGame");
	setTimeout(function () { sound.play(); }, 100);
}
function winSound() {
	var sound = document.getElementById("winGame");
	setTimeout(function () { sound.play(); }, 100);
}

function drawLine(coordX1, coordY1, coordX2, coordY2) {
	var canvas = document.getElementById('winLine')
	var c = canvas.getContext('2d');

	var x1 = coordX1;
	var y1 = coordY1;
	var x2 = coordX2;
	var y2 = coordY2;

	var x = x1
	var y = y1

	function animate() {
		var animationLoop = requestAnimationFrame(animate);
		c.clearRect(0, 0, 600, 600)

		c.beginPath();
		c.moveTo(x1, y1)
		c.lineTo(x, y)
		c.lineWidth = 10;
		c.strokeStyle = "green";
		c.stroke();

		if (x < x2) {
			x = x + 20;
		}
		if (y < y2) {
			y = y + 20;
		}
		if (x >= x2 && y >= y2) {
			cancelAnimationFrame(animationLoop);
		}
	}


	function clear() {
		var animationLoop = requestAnimationFrame(clear);
		c.clearRect(0, 0, 600, 600);
		cancelAnimationFrame(animationLoop);
	}

	winSound();
	animate();
	setTimeout(function () { clear(); resetGame();}, 1200);
}