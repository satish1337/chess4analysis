var selectedSource = false;

function startGame() {
  alert("starting game");

  $(".cell").on("click", function () {
    if (selectedSource === false) {
      // we have to select the chosen square as selected source.
      let coin = this.getElementsByTagName("span")[0];
      console.log(coin.classList);

      if (coin.classList.length == 0) {
        console.log("clicked on empty box");
        return;
      }
      let coinInfo = coin.classList[0].split("-");
      sourceCoordinates = getCellCoordinates(this.classList);
      let validMoves = getValidMoves(
        coinInfo[1],
        coinInfo[2],
        sourceCoordinates
      );
      console.log("valid moves, ", validMoves);
      this.classList.add("selectedSquare");
      selectedSource = true;
      console.log("source selected");
    } else {
      // this means, we have to check conditions and move piece to destination click
      sourcePiece = document.getElementsByClassName("selectedSquare")[0];
      sourceCoordinates = getCellCoordinates(sourcePiece.classList);
      destCoordinates = getCellCoordinates(this.classList);
      movePiece(
        sourceCoordinates[0],
        sourceCoordinates[1],
        destCoordinates[0],
        destCoordinates[1]
      );
      sourcePiece.classList.remove("selectedSquare");
      selectedSource = false;
    }
  });
}

function getValidMoves(color, coin, sourceCoordinates) {
  console.log(color, coin, sourceCoordinates);

  let validMoves = [];

  if (coin == "rook") {
    // up direction
    let start = [sourceCoordinates[0] - 1, sourceCoordinates[1]];
    while (start[0] >= 0) {
      sourceClassname = "cell row" + start[0] + " col" + start[1];
      sourceElems = document.getElementsByClassName(sourceClassname);
      let squareContent = sourceElems[0].getElementsByTagName("span");
      console.log(
        "square content length. ",
        squareContent.length,
        squareContent
      );
      if (squareContent.length !== 0) {
        coinInfo = squareContent[0].classList[0].split("-");
        console.log("square already occupied, ", start, coinInfo);
        if (coinInfo[1] === color) {
          break;
        } else {
          validMoves.push(start);
          break;
        }
      }

      validMoves.push(start);
      start = [start[0] - 1, start[1]];
    }

    // left direction
    start = [sourceCoordinates[0], sourceCoordinates[1] - 1];
    while (start[1] >= 0) {
      sourceClassname = "cell row" + start[0] + " col" + start[1];
      sourceElems = document.getElementsByClassName(sourceClassname);
      squareContent = sourceElems[0].getElementsByTagName("span");
      if (squareContent.length !== 0) {
        coinInfo = squareContent[0].classList[0].split("-");
        console.log("square already occupied, ", start, coinInfo);
        if (coinInfo[1] === color) {
          break;
        } else {
          validMoves.push(start);
          break;
        }
      }
      validMoves.push(start);
      start = [start[0], start[1] - 1];
    }

    // down direction
    start = [sourceCoordinates[0] + 1, sourceCoordinates[1]];
    while (start[0] <= 7) {
      sourceClassname = "cell row" + start[0] + " col" + start[1];
      sourceElems = document.getElementsByClassName(sourceClassname);
      squareContent = sourceElems[0].getElementsByTagName("span");
      if (squareContent.length !== 0) {
        coinInfo = squareContent[0].classList[0].split("-");
        console.log("square already occupied, ", start, coinInfo);
        if (coinInfo[1] === color) {
          break;
        } else {
          validMoves.push(start);
          break;
        }
      }
      validMoves.push(start);
      start = [start[0] + 1, start[1]];
    }

    // right direction
    start = [sourceCoordinates[0], sourceCoordinates[1] + 1];
    while (start[1] <= 7) {
      sourceClassname = "cell row" + start[0] + " col" + start[1];
      sourceElems = document.getElementsByClassName(sourceClassname);
      squareContent = sourceElems[0].getElementsByTagName("span");
      if (squareContent.length !== 0) {
        coinInfo = squareContent[0].classList[0].split("-");
        console.log("square already occupied, ", start, coinInfo);
        if (coinInfo[1] === color) {
          break;
        } else {
          validMoves.push(start);
          break;
        }
      }
      validMoves.push(start);
      start = [start[0], start[1] + 1];
    }
  }
  return validMoves;
}

function getCellCoordinates(classList) {
  coordinates = [];
  for (let i = 0; i < classList.length; i++) {
    if (classList.item(i).startsWith("row")) {
      let row = classList.item(i).replace("row", "");
      coordinates.push(parseInt(row));
    }
    if (classList.item(i).startsWith("col")) {
      let row = classList.item(i).replace("col", "");
      coordinates.push(parseInt(row));
    }
  }
  console.log("clicked on ", coordinates);
  return coordinates;
}

function setupPieces(home) {
  if (home == true) {
    mainRow = "row0";
    pawnRow = "row1";
  } else {
    mainRow = "row7";
    pawnRow = "row6";
  }
  mainElements = document.getElementsByClassName(mainRow);
  for (var j = 0; j < mainElements.length; j++) {
    if (home) {
      key = j;
    } else {
      key = mainElements.length - j - 1;
    }
    element = mainElements[j];
    coin = document.createElement("SPAN");
    coin.style.fontSize = "50px";
    coinColor = home ? "white" : "black";
    if (key == 0 || key == mainElements.length - 1) {
      coinId = home ? "\u2656" : "\u265c";
      coinName = "coin-" + coinColor + "-" + "rook";
    }
    if (key == 1 || key == mainElements.length - 2) {
      coinId = home ? "\u2658" : "\u265e";
      coinName = "coin-" + coinColor + "-" + "knight";
    }
    if (key == 2 || key == mainElements.length - 3) {
      coinId = home ? "\u2657" : "\u265d";
      coinName = "coin-" + coinColor + "-" + "bishop";
    }
    if (key == 3) {
      coinId = home ? "\u2654" : "\u265a";
      coinName = "coin-" + coinColor + "-" + "king";
    }
    if (key == 4) {
      coinId = home ? "\u2655" : "\u265b";
      coinName = "coin-" + coinColor + "-" + "queen";
    }
    var textnode = document.createTextNode(coinId);
    coin.className = coinName;
    coin.append(textnode);
    element.append(coin);
  }

  elements = document.getElementsByClassName(pawnRow);
  for (var j = 0; j < elements.length; j++) {
    element = elements[j];
    coin = document.createElement("SPAN");
    if (home) {
      coinId = "\u2659";
      coinName = "coin-white-pawn";
    } else {
      coinId = "\u265f";
      coinName = "coin-black-pawn";
    }
    var textnode = document.createTextNode(coinId);
    coin.style.fontSize = "50px";
    coin.className = coinName;
    coin.append(textnode);
    element.append(coin);
  }
}

function initiateGameBoard() {
  var board = document.getElementById("board");
  for (var i = 0; i < 8; i++) {
    var row = document.createElement("DIV");
    row.className = "row";
    for (var j = 0; j < 8; ++j) {
      var square = document.createElement("DIV");
      square.className = "cell row" + i + " col" + j;

      square.style.display = "inline-block";
      square.style.border = "1px";
      square.style.borderStyle = "solid";
      square.style.verticalAlign = "top";
      square.style.textAlign = "center";
      square.style.width = "50px";
      square.style.height = "50px";
      square.style.backgroundColor = (i + j) % 2 === 0 ? "white" : "#404040";
      row.appendChild(square);
    }
    board.appendChild(row);
  }

  setupPieces(true);
  setupPieces(false);
  startGame();
}

function movePiece(sr, sc, dr, dc) {
  sourceClassname = "cell row" + sr + " col" + sc;
  destClassname = "cell row" + dr + " col" + dc;
  sourceElems = document.getElementsByClassName(sourceClassname);
  destElems = document.getElementsByClassName(destClassname);
  destElems[0].innerHTML = sourceElems[0].innerHTML;
  //   coin = document.createElement("SPAN");
  //   element.append(coin);
  sourceElems[0].innerHTML = "";
}
