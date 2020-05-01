var activePlayer = "Game Stopped";

var arrayO = document.getElementsByClassName("O");
var arrayX = document.getElementsByClassName("X");
for (var i=0; i<arrayO.length; i++) {
	arrayO[i].style.transform = "translateY(-100%)";
}
for (var i=0; i<arrayX.length; i++) {
	arrayX[i].style.transform = "translateY(100%)";
}

// This function will get fired once the DOM is loaded.
// Disable the stop button since it is not needed until game start.
window.onload = function() {watch()};
function watch() {
	var btn = document.getElementById('btnStop');
	btnDisabled(btn);  // disable the stop button since the game has not started
}

function startGame() {
	activePlayer = "Player 1";
	
	// assign proper state of the control buttons
	var btn = document.getElementById('btnStart');
	btnDisabled(btn);  // disable the start button since the game is now afoot
	var btn = document.getElementById('btnStop');
	stopEnabled(btn);  // enable the stop button since the game is now afoot
}

// this function styles the game buttons while they are disabled
function btnDisabled(btn) {
	btn.style.color = "fff";
	btn.style.border = "2px solid rgb(153, 153, 102)";
	btn.style.backgroundColor = "rgb(214, 214, 194)";
	btn.disabled = true;
}

// this function styles the game buttons while they are disabled
function stopEnabled(btn) {
	btn.style.color = "#fff";
	btn.style.border = "2px solid rgb(204, 0, 0)";
	btn.style.backgroundColor = "rgb(255, 51, 51)";
	btn.disabled = false;
}

// this function styles the game buttons while they are disabled
function startEnabled(btn) {
	btn.style.color = "#fff";
	btn.style.border = "2px solid rgb(0, 153, 0)";
	btn.style.backgroundColor = "rgb(57, 230, 0)";
	btn.disabled = false;
}

// when the user indicates, stop the current game and reset game
function stopGame() {
	hideGameMsg(); // clear the text and hide message box
	var btn = document.getElementById('btnStart');
	startEnabled(btn); // enable the start button since the game is now stopped
	var btn = document.getElementById('btnStop');
	btnDisabled(btn); // disable the stop button since the game is now stopped
	activePlayer = "Game Stopped";
	
	// reset all squares to their starting empty state.
	var arrayO = document.getElementsByClassName("O");
	var arrayX = document.getElementsByClassName("X");
	for (var i=0; i<arrayO.length;i++) {
		arrayO[i].style.transform = "translateY(-100%)";
	}
	for (var i=0; i<arrayX.length;i++) {
		arrayX[i].style.transform = "translateY(100%)";
	}
	// this clears the running log of all game moves
	document.getElementById('boardState').innerHTML = "";
}

// this function will show the message console and any text it may have
function showGameMsg() {
	document.getElementById('gameMsgBox').style.display = 'block';
}

// this function will conceal the message console from view
function hideGameMsg() {
	clearMsg() // clear the text from the message console
	document.getElementById('gameMsgBox').style.display = 'none'; // hide the div
}

// this function will write text to the game message console
function writeMsg(txt) {
	showGameMsg();
	document.getElementById('gameMsg').innerHTML = txt;
}

// this function will clear the text from the message console
function clearMsg() {
	document.getElementById('gameMsg').innerHTML = "";
}


// this function return's the currently assigned avatar for each player
function getAvatars() {
	var p1Avatar = "O"
    var p2Avatar = "X"
	var avatarArray = [p1Avatar,p2Avatar];
	return avatarArray;
}

// this function will return the active player's avatar
function determineAvatar() {
	// determine the correct avatar to paint for the active player
	var avatarArray = getAvatars(); // returns an array of both player's assigned avatars
	p1Avatar = avatarArray[0];
	p2Avatar = avatarArray[1];
	if (activePlayer == "Player 1") { // check which player is active and their corresponding avatar
		var paintAvatar = p1Avatar;
	} else if (activePlayer == "Player 2") {
		var paintAvatar = p2Avatar;
	}
	return paintAvatar; // returned back the correct avatar
}

// this function changes active player over to the other player
function avatarPlaced() {
	var parseText = document.getElementById('gameMsg').innerHTML;
	// check if there is already a winner...if there is, then dont continue the game
	if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!"){
		activePlayer = "Game Stopped";
	}
	if (activePlayer == "Player 1") { // once active player selects a square change the active player
		activePlayer = "Player 2";
	} else {
		activePlayer = "Player 1";
	}
	check4Tie(); // call this function to inquire if there was a cat's game.
}

// this function will get the array of the current board 
// and check the proposed move for a validity
function check(info,square) {
	for (var i in info) {
    	var tempInfo = info[i].charAt(0); // comparing index of square
        if (tempInfo == square) {
        	return tempInfo;
        }
    }
}

// as squares are selected they check in with this function to see if that particular 
// square has already been assigned and if it has not, record new square with the assigned avatar.
function recordMoves(square) {
	var proposedMove = square;
	var boardState = document.getElementById('boardState').innerHTML; // retrieve boardState array
	var info = boardState.split(','); // separate the string by commas to create an array
	verdict = check(info,square); // call function to check if proposed square is already occupied
	return verdict;
}

// this function will get list of previous moves 
// and then concatenate the current move to it.
function recordMove(currentMove) {
	var target = document.getElementById('boardState');
	var previousMoves = target.innerHTML;
	target.innerHTML = previousMoves+currentMove;
}

function checkForWinCon() {
	var squareArray = [];
	var target = document.getElementById('boardState');
	var info = target.innerHTML; // raw array with squares and avatars
	info = info.substring(1); // remove leading comma
	info = info.split(','); // separate the string by commas into an array
    info.sort(); // sort the square array in order despite the actual gameplay sequence
    for (var i in info) {
    	squareArray.push(info[i].charAt(0)); // new array with only squares not avatars
	}
	WinCheck();
	check4Tie();
}

// call this function to check board state for any ties and act accordingly
function check4Tie() {
	var boardState = document.getElementById('boardState').innerHTML;
	boardState = boardState.substring(1); // remove leading comma
	boardState = boardState.split(','); // separate the string by commas into an array
	var check = document.getElementById('gameMsg').innerHTML;
	if(boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
		var txt1 = "Oh no! Nobody wins, it was a tie!";
		tieSound(); // play a sound when a tie has been detected
		writeMsg(txt1);
		setTimeout(function() {stopGame();}, 3000);
	}
}

// whenever a win is detected the corresponding function will 
// call this function to produce the following winning process for the game
function winner(winDetected,winCon) {
	if (winDetected == "win") {
		var showme = winDetected;
		var txt2 = "That's three in a row, "+activePlayer+" wins!";
		writeMsg(txt2);
		var btn = document.getElementById('btnStart');
		startEnabled(btn); // enable the start button since the game is now stopped
		var btn = document.getElementById('btnStop');
		btnDisabled(btn); // disable the stop button since the game is now stopped
		activePlayer = "Game Stopped";
		glowBoard(winCon); // call function to make the gameboard pulse with colors
	} 
}

// this function will make the winning squares light up in celebration
function glowBoard(pos) {
	var index0 = pos[0];
	var index1 = pos[1];
	var index2 = pos[2];
	var squares = document.getElementsByClassName('square')
	for (var i=0;i<squares.length;i++){
		if (i == index0) {
			var bg1 = squares[i];
			blink();
			winSound();
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg1.style.backgroundColor = '#d7f3f7';}, 1100);
		} else if (i == index1) {
			var bg2 = squares[i];
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 100);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 200);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 400);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 500);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 600);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 700);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 900);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 1000);
			setTimeout(function() {bg2.style.backgroundColor = '#d7f3f7';}, 1100);
		} else if (i == index2) {
			var bg3 = squares[i];
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg3.style.backgroundColor = '#d7f3f7';}, 1100);
		}
	}
	setTimeout(function() {stopGame();}, 1200);
}

// these functions will produce game sounds depending on the occasion
function squareSound() { 
	var sound = document.getElementById("placeAvatar");
    sound.play();
	setTimeout(function() {sound.pause();}, 400); // add delay to these to keep sound short
	setTimeout(function() {sound.currentTime = 0;}, 500);
}
function tieSound() { 
	var sound = document.getElementById("tieGame");
	var check = document.getElementById('gameMsg').innerHTML;
    setTimeout(function() {sound.play();}, 500);
}
function winSound() { 
	var sound = document.getElementById("winGame");
	setTimeout(function() {sound.play();}, 500);
	setTimeout(function() {sound.pause();}, 2700); // add delay to these to keep sound short
	setTimeout(function() {sound.currentTime = 0;}, 2800);
}
function diceRoll() { 
	var sound = document.getElementById("diceRoll");
	sound.play();
}

// call this function to make entire background color 
// flash for a few seconds for a win animation
function blink() {
	var body = document.getElementById('body');
	setTimeout(function() {body.style.backgroundColor = '#94f7ed';}, 100);
	setTimeout(function() {body.style.backgroundColor = '#94cef7';}, 200);
	setTimeout(function() {body.style.backgroundColor = '#94a6f7';}, 300);
	setTimeout(function() {body.style.backgroundColor = '#b094f7';}, 400);
	setTimeout(function() {body.style.backgroundColor = '#cc94f7';}, 500);
	setTimeout(function() {body.style.backgroundColor = '#e894f7';}, 600);
	setTimeout(function() {body.style.backgroundColor = '#f794d9';}, 700);
	setTimeout(function() {body.style.backgroundColor = '#f73881';}, 800);
	setTimeout(function() {body.style.backgroundColor = '#c6034e';}, 900);
	setTimeout(function() {body.style.backgroundColor = '#e00202';}, 1000);
	setTimeout(function() {body.style.backgroundColor = '#ffffff';}, 1100);
}

// -------------------------------------------------------------
// These function are the algorithms to find all win conditions
// -------------------------------------------------------------
function WinCheck(){
	var boardState = document.getElementById('boardState').innerHTML; 
	function inc(var1, var2, var3){
		var x = boardState.includes(var1)
		var y = boardState.includes(var2)
		var z = boardState.includes(var3)
		if (x == true && y == true && z == true){
			return true
		} else {
			return false
		}
	}
	if (inc('0X','1X','2X')) {winner('win',[0,1,2])}
	else if (inc('3X','4X','5X')) {winner('win',[3,4,5])}
	else if (inc('6X','7X','8X')) {winner('win',[6,7,8])}
	else if (inc('0X','3X','6X')) {winner('win',[0,3,6])}
	else if (inc('1X','4X','7X')) {winner('win',[1,4,7])}
	else if (inc('2X','5X','9X')) {winner('win',[2,5,8])}
	else if (inc('6X','4X','2X')) {winner('win',[6,4,2])}
	else if (inc('0X','4X','8X')) {winner('win',[0,4,8])}

	else if (inc('0O','1O','2O')) {winner('win',[0,1,2])}
	else if (inc('3O','4O','5O')) {winner('win',[3,4,5])}
	else if (inc('6O','7O','8O')) {winner('win',[6,7,8])}
	else if (inc('0O','3O','6O')) {winner('win',[0,3,6])}
	else if (inc('1O','4O','7O')) {winner('win',[1,4,7])}
	else if (inc('2O','5O','9O')) {winner('win',[2,5,8])}
	else if (inc('6O','4O','2O')) {winner('win',[6,4,2])}
	else if (inc('0O','4O','8O')) {winner('win',[0,4,8])}
}
//---------------------------------------------------------------------------------------
// These block of functions are for each click event of their corresponding square element
//---------------------------------------------------------------------------------------
function square1Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "0"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square2Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "1"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[1]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square3Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "2"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[2]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square4Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "3"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[3]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square5Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "4"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[4]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square6Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "5"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[5]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square7Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "6"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[6]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square8Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "7"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[7]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}
function square9Animate() {
	if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
		var square = "8"; // identify the square selected
		// check if the proposed square is valid
		var verdict = recordMoves(square);
		if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
			var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
			var selected = document.getElementsByClassName(paintAvatar)[8]; // paint avatar
			if (paintAvatar == "O") { // change these all to ternary satetments instead
				animateO(selected); // call function to animate O
			} else if (paintAvatar == "X") {
				animateX(selected); // call function to animate X
			}
			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
			recordMove(currentMove);
			checkForWinCon(); // call function to check if current move completes a winning condition.
			avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
			squareSound(); // play a game sound when the avatar is placed
		}
	}
}

// this function will perform the animation for the O avatar.
function animateO(selected) {
	selected.style.transform = (selected.style.transform == "translateY(0%)" || null) ? "translateY(0%)" : "translateY(0%)";
}

// this function will perform the animation for the X avatar.
function animateX(selected) {
	selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0%)" : "translateY(-100%)";
}

