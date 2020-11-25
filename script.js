const GameBoard = (function () {
  let gameBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
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
      GameBoard.gameBoardArray[e.target.getAttribute("name")] = sign
      GameBoard.displayBoard()
      e.target.style.cssText = "font-size: 20vh"
      removeElistener()
      GameFlow.game()
    }
  }

  const play = function () {
    GameBoard.squares.forEach(function (square) {
      square.addEventListener("click", playEvent)
    })
  }

  return { play, removeElistener }
}

const GameFlow = (function () {
  const winMsg = document.getElementById("winMsg")
  const playAgainButton = document.getElementById("playAgain")
  const playerX = Player("x")
  const playerO = Player("o")

  const checkWinner = function (sign = "z") {
    let strBoard = GameBoard.gameBoardArray.join("")
    const re1 = RegExp(`${sign}..${sign}..${sign}`)
    const re2 = RegExp(`${sign}...${sign}...${sign}`)
    const re3 = RegExp(`..${sign}.${sign}.${sign}..`)
    const re4 = strBoard.slice(3, 6) == `${sign}${sign}${sign}`
    const re5 = strBoard.slice(0, 3) == `${sign}${sign}${sign}`
    const re6 = strBoard.slice(6, 9) == `${sign}${sign}${sign}`
    if (re1.test(strBoard) || re2.test(strBoard) || re3.test(strBoard) || re4 || re5 || re6) {
      return "win";
    }
    else if (!GameBoard.gameBoardArray.includes(" ")) {
      return "Tie"
    }
    else {
      return false
    }
  }

  const game = function () {
    if (checkWinner() === "Tie") {
      winMsg.textContent = "Tie!"
      winMsg.style.cssText = "transform: scale(1.2,1.2);"
    }
    playerX.play()
    if (checkWinner("x") === "win") {
      winMsg.textContent = "Player with Xs win!"
      playerX.removeElistener()
      playerO.removeElistener()
      winMsg.style.cssText = "transform: scale(1.2,1.2);"

    }
    else {
      playerO.play()
      if (checkWinner("o") === "win") {
        winMsg.textContent = "Player with Os win!"
        playerX.removeElistener()
        playerO.removeElistener()
        winMsg.style.cssText = "transform: scale(1.2,1.2);"
      }
    }
  }
  const playAgain = function () {
    playAgainButton.addEventListener("click", function () {
      for (let i = 0; i < 9; i++) {
        GameBoard.gameBoardArray[i] = " "
      }
      GameBoard.displayBoard()
      winMsg.textContent = ""

      GameBoard.squares.forEach(function (square) {
        square.style.cssText = ""
      })
      winMsg.style.cssText = ""

      game()
    })
  }
  return { game, playAgain }
})()

GameFlow.playAgain()
GameFlow.game()