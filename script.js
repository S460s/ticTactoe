
const GameBoard = (() => {
  // Board Object
  let squares = document.querySelectorAll("#square")
  let gameboard = ["", "", "", "", "", "", "", "", ""]

  return { gameboard, squares }
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
      play()
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

console.log("tets");
