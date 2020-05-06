let activePlayer = "X"; //This variable keeps track of who's turn it is.
let selectedSquares = []; //This array stores an array of moves. We use this to determine win conditions.

function placeXOrO(squareNumber) { //This function is for placing an x or o in a square.
    if (!selectedSquares.some(element => element.includes(squareNumber))) { //This condition ensures a square hasn't be selected already. The .some() method is used to check each element of selectedSquare array to see if it contains the square number clicked on.
        let select = document.getElementById(squareNumber); //This variable retrieves the html element id that was clicked.
        if (activePlayer === "X") { //This condition checks who's turn it is.
            select.style.backgroundImage = 'url("images/x.png")'; //If activePlayer is equal to "X", the x.png is placed in HTML.
        } else { //Active player may only be "X" or "O" so, if not "X" it must be "O"
            select.style.backgroundImage = 'url("images/o.png")'; //If activePlayer is equal to "O", the o.png is placed in HTML.
        }
        selectedSquares.push(squareNumber + activePlayer); //squareNumber and activePlayer are concatenated together and added to array.
        checkWinConditions(); //This calls a function to check for any win conditions. More on this below.
        if (activePlayer === "X") { //This condition is for changing the active player.
            activePlayer = "O"; //If active player is "X" change it to "O".
        } else { //If active player is anthing other than "X".
            activePlayer = "X"; //Change the activePlayer to "X"
        }
        sound("place-x-or-o-sound"); //This function plays placement sound.
    }
}

function checkWinConditions() { //This function parses the selectedSquares array to search for win conditions. drawWinLine function is called to draw line if condition is met.
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) } // X 0, 1, 2 condition. 
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) } // X 3, 4, 5 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) } // X 6, 7, 8 condition.
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) } // X 0, 3, 6 condition.
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) } // X 1, 4, 7 condition.
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) } // X 2, 5, 8 condition.
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) } // X 6, 4, 2 condition.
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) } // X 0, 4, 8 condition.
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) } // O 0, 1, 2 condition.
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) } // O 3, 4, 5 condition.
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) } // O 6, 7, 8 condition.
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) } // O 0, 3, 6 condition.
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) } // O 1, 4, 7 condition.
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) } // O 2, 5, 8 condition.
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) } // O 6, 4, 2 condition.
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) } // O 0, 4, 8 condition.
    else if (selectedSquares.length >= 9) { // This condition checks for tie. If none of the above conditions register and 9 squares are selected the code executes.
        sound("tie-game-sound"); //This function playes the tie game sound.
        setTimeout(function () { resetGame(); }, 300); // This function sets a .3 second timer before the resetGame is called.
    }

    function arrayIncludes(squareA, squareB, squareC) { // This function checks if an array includes 3 strings. It is used to check for each win condition.
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        if (a === true && b === true && c === true) { return true }
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
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608)
        c.beginPath();
        c.moveTo(x1, y1)
        c.lineTo(x, y)
        c.lineWidth = 10;
        c.strokeStyle = "rgba(70, 255, 33, .8)";
        c.stroke();
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
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