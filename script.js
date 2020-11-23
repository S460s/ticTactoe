const GameBoard = (() => {
  // Board Object
  let squares = document.querySelectorAll("#square")
  let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]



  const checkWinner = function (sign) {
    let strBoard = gameboard.join("")
    console.log(strBoard);
    console.log(sign);
    const re1 = RegExp(`${sign}..${sign}..${sign}`)
    const re2 = RegExp(`${sign}...${sign}...${sign}`)
    const re3 = RegExp(`..${sign}.${sign}.${sign}`)
    console.log(re1);


    if (re1.test(strBoard) || re2.test(strBoard) || re3.test(strBoard)) {
      return true
    }
    else {
      return false
    }
  }

  return { gameboard, squares, checkWinner }
})()



const Player = (sign, gameboard, squares) => {
  // Player Constructor Object

  const removeElistener = () => {
    squares.forEach(square => {
      square.removeEventListener("click", playEvent)
    })
  }

  const playEvent = function (e) {
    if (e.target.textContent !== "X" && e.target.textContent !== "O") {
      gameboard[e.target.getAttribute("name")] = sign
      e.target.textContent = sign

      removeElistener()
      if (GameBoard.checkWinner(sign)) {
        console.log(`Congrats! Player with ${sign}s wins!`);
        removeElistener()
      }
      else {
        play()
      }
    }
  }

  const play = () => {
    squares.forEach(square => {
      square.addEventListener("click", playEvent)
    })
  }
  return { play, }
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