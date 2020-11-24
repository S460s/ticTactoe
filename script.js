const GameBoard = (function () {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""]
  let squares = document.querySelectorAll("#square")

  const removeElistener = function () {
    console.log("test");
    squares.forEach(function (square) {
      square.removeEventListener("click", playEvent)
    })
  }

  const playEvent = function (sign, event) {
    console.log(`event ->  ${event} ; sign -> ${sign}`);
    console.log(event.target);

    gameBoardArray[event.target.getAttribute("name")] = sign
    displayBoard()
  }

  const play = function (sign) {
    squares.forEach(function (square) {
      square.addEventListener("click", playEvent.bind(event, sign))
    })
  }

  const displayBoard = function () {
    squares.forEach(function (square) {
      square.textContent = gameBoardArray[square.getAttribute("name")]
    })
  }

  return { play }
})()


const Player = function () {

  return {}
}

const GameFlow = (function () {

  return {}
})()

GameBoard.play("o")
