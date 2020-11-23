const Player = (sign, gameboard, squares) => {
  // Player Constructor Object

  const play = () => {
    squares.forEach(square => {
      console.log(square.value);
      square.addEventListener("click", () => {
        square.textContent = sign
        gameboard
        console.log(square.value);

      })
    })
  }
  return { play }
}