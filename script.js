

const GameBoard = (function () {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""]
  let squares = document.querySelectorAll("#square")

  const displayBoard = function () {
    squares.forEach(function (square) {
      square.textContent = gameBoardArray[square.getAttribute("name")]
    })
  }

  return { displayBoard, gameBoardArray, squares }
})()


const Player = function (sign) {

  const removeElistener = () => {
    GameBoard.squares.forEach(square => {
      square.removeEventListener("click", playEvent)
    })
  }

  const playEvent = function (e) {
    if (e.target.textContent !== "x" && e.target.textContent !== "o") {
      console.log(`e ->  ${e} ; sign -> ${sign}`);
      GameBoard.gameBoardArray[e.target.getAttribute("name")] = sign
      GameBoard.displayBoard()
      removeElistener()
      GameFlow.game()
    }
  }

  const play = function () {
    GameBoard.squares.forEach(function (square) {
      square.addEventListener("click", playEvent)
    })
  }

  return { play, }
}

const GameFlow = (function () {

  const playerX = Player("x")
  const playerO = Player("o")

  const checkWinner = function (sign) {
    let strBoard = GameBoard.gameBoardArray.join("")
    const re1 = RegExp(`${sign}..${sign}..${sign}`)
    const re2 = RegExp(`${sign}...${sign}...${sign}`)
    const re3 = RegExp(`..${sign}.${sign}.${sign}..`)
    const re4 = strBoard.slice(3, 6) == `${sign}${sign}${sign}`
    const re5 = strBoard.slice(0, 3) == `${sign}${sign}${sign}`
    const re6 = strBoard.slice(6, 9) == `${sign}${sign}${sign}`

    if (re1.test(strBoard) || re2.test(strBoard) || re3.test(strBoard) || re4 || re5 || re6) {
      console.log(`Player with ${sign}s win.`);
    }
    else if (!strBoard.includes("")) {
      console.log("Tie");
    }
    else {
      return false
    }
  }

  const game = function () {
    console.log("hello");
    playerO.play()
    playerX.play()
  }

  return { game }
})()

GameFlow.game()