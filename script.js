
const GameBoard = (() => {
  // Board Object
  let squares = document.querySelectorAll("#square")
  let gameboard = ["", "", "", "", "", "", "", "", ""]

  const displayBoard = () => {
    let i = 0
    squares.forEach(square => {
      square.textContent = gameboard[i]
      i++
    })
  }


  return { displayBoard, gameboard, squares }
})()


const Player = (sign, gameboard, squares) => {
  // Player Constructor Object

  const play = () => {
    squares.forEach(square => {
      console.log(squares.value);
      square.addEventListener("click", () => {
        square.textContent = sign
        console.log(square.value);
        gameboard[square.value] = sign
        console.log(gameboard)
      })
    })
  }
  return { play }
}

const GameFlow = () => {
  // GameFlow Constructor Function
}

GameBoard.displayBoard()

const playerO = Player("O", GameBoard.gameboard, GameBoard.squares)
playerO.play()