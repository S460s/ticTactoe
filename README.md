const GameBoard = (() => {
  // Board Object
  let squares = document.querySelectorAll("#square")
  let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

  const displayBoard = function () {
    squares.forEach((square) => {
      square.textContent = gameboard[square.getAttribute("name")]
    })

  }

  const checkWinner = function (sign) {
    let strBoard = gameboard.join("")
    const re1 = RegExp(`${sign}..${sign}..${sign}`)
    const re2 = RegExp(`${sign}...${sign}...${sign}`)
    const re3 = RegExp(`..${sign}.${sign}.${sign}..`)
    const re4 = strBoard.slice(3, 6) == `${sign}${sign}${sign}`
    const re5 = strBoard.slice(0, 3) == `${sign}${sign}${sign}`
    const re6 = strBoard.slice(6, 9) == `${sign}${sign}${sign}`

    if (re1.test(strBoard) || re2.test(strBoard) || re3.test(strBoard) || re4 || re5 || re6) {
      return "win"
    }
    else if (!strBoard.includes(" ")) {
      return "tie"
    }
    else {
      return false
    }
  }

  return { gameboard, squares, checkWinner, displayBoard }
})()



const Player = (sign, gameboard, squares) => {
  let i = 0
  // Player Constructor Object

  const removeElistener = () => {
    squares.forEach(square => {
      square.removeEventListener("click", playEvent)
    })
  }


  const playEvent = function (e) {
    if (e.target.textContent !== "X" && e.target.textContent !== "O" && !(GameBoard.checkWinner(sign) === "win")) {

      gameboard[e.target.getAttribute("name")] = sign
      console.log("TEST!2ject");
      GameBoard.displayBoard()
      removeElistener()

      console.log(GameBoard.checkWinner(sign));
      if (GameBoard.checkWinner(sign) === "win") {
        console.log(`Congrats! Player with ${sign}s wins!`);

      }

      else if (GameBoard.checkWinner(sign) === "tie") {
        console.log("Tie");
      }
      else if (!GameBoard.checkWinner(sign)) {
        i++
        console.log(i);
        play()
      }

    }
  }

  const play = () => {
    console.log(123);
    squares.forEach(square => {
      square.addEventListener("click", playEvent)
    })
  }

  return { play, removeElistener }
}


const GameFlow = (() => {
  // GameFlow Constructor Function
  const playerX = Player("X", GameBoard.gameboard, GameBoard.squares)
  const playerO = Player("O", GameBoard.gameboard, GameBoard.squares)


  const game = function () {

    playerX.play()
    playerO.play()

  }

  return { game }
})()

GameFlow.game()