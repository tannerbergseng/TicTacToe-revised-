var activePlayer = "Player 1";
var recordSquares = [];

function animateSquare(square) {
	if (!check(recordSquares, square)) {
		var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
		var selected = document.getElementById(square); // paint avatar
		if (paintAvatar == "O") { // change these all to ternary satetments instead
			selected.style.backgroundImage = 'url("images/o.png")'
		} else {
			selected.style.backgroundImage = 'url("images/x.png")'
		}
		recordSquares.push(square + paintAvatar);
		WinCheck();
		avatarPlaced(); // end current turn and pass the turn to the other player
		sound("placeAvatar"); // play a game sound when the avatar is placed
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
	if (activePlayer == "Player 1") {
		paintAvatar = "O";
	} else {
		paintAvatar = "X";
	}
	return paintAvatar; // returned back the correct avatar
}

function WinCheck() {
	if (inc('0X', '1X', '2X')) { drawLine(50, 100, 558, 100) }
	else if (inc('3X', '4X', '5X')) { drawLine(50, 300, 558, 300) }
	else if (inc('6X', '7X', '8X')) { drawLine(50, 500, 558, 500) }
	else if (inc('0X', '3X', '6X')) { drawLine(100, 50, 100, 558) }
	else if (inc('1X', '4X', '7X')) { drawLine(300, 50, 300, 558) }
	else if (inc('2X', '5X', '8X')) { drawLine(500, 50, 500, 558) }
	else if (inc('6X', '4X', '2X')) { drawLine(100, 508, 510, 90) }
	else if (inc('0X', '4X', '8X')) { drawLine(100, 100, 520, 520) }

	else if (inc('0O', '1O', '2O')) { drawLine(50, 100, 558, 100) }
	else if (inc('3O', '4O', '5O')) { drawLine(50, 300, 558, 300) }
	else if (inc('6O', '7O', '8O')) { drawLine(50, 500, 558, 500) }
	else if (inc('0O', '3O', '6O')) { drawLine(100, 50, 100, 558) }
	else if (inc('1O', '4O', '7O')) { drawLine(300, 50, 300, 558) }
	else if (inc('2O', '5O', '8O')) { drawLine(500, 50, 500, 558) }
	else if (inc('6O', '4O', '2O')) { drawLine(100, 508, 510, 90) }
	else if (inc('0O', '4O', '8O')) { drawLine(100, 100, 520, 520) }
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
			sound("tieGame"); // play a sound when a tie has been detected
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
		square.style.backgroundImage = ""
	}
	recordSquares = []; // this clears the running log of all game moves
}

function sound(selectSound) {
	var sound = document.getElementById(selectSound);
	sound.play();
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
		var animationLoop = requestAnimationFrame(clear);
		c.clearRect(0, 0, 608, 608);
		cancelAnimationFrame(animationLoop);
	}
	sound("winGame");
	animate();
	setTimeout(function () { clear(); resetGame(); }, 1500);
}