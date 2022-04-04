import { Turn, Players } from "../context/GameContext"

export const checkWin = (playingField: Array<'' | Turn>, players: Players) => {
  let winner = ''
  // horisontal win
  const hWin = horisontalWin(playingField, players)

  // vertical win
  const vWin = verticalWin(playingField, players)

  // diagonal win
  const dWin = diagonalWin(playingField, players)

  if (hWin) {
    winner = hWin
  } else if (vWin) {
    winner = vWin
  } else if (dWin) {
    winner = dWin
  }

  return winner
}

const horisontalWin = (playingField: Array<'' | Turn>, players: Players): string => {
  if (
    (playingField[0] === Turn.p1 && playingField[1] === Turn.p1 && playingField[2] === Turn.p1) ||
    (playingField[3] === Turn.p1 && playingField[4] === Turn.p1 && playingField[5] === Turn.p1) ||
    (playingField[6] === Turn.p1 && playingField[7] === Turn.p1 && playingField[8]=== Turn.p1)
  ) {
    players.p1.score++
    return players.p1.name
  } else if (
    (playingField[0] === Turn.p2 && playingField[1] === Turn.p2 && playingField[2] === Turn.p2) ||
    (playingField[3] === Turn.p2 && playingField[4] === Turn.p2 && playingField[5] === Turn.p2) ||
    (playingField[6] === Turn.p2 && playingField[7] === Turn.p2 && playingField[8] === Turn.p2)
  ) {
    players.p2.score++
    return players.p2.name
  }
}

const verticalWin = (playingField: Array<'' | Turn>, players: Players): string => {
  if (
    (playingField[0] === Turn.p1 && playingField[3] === Turn.p1 && playingField[6] === Turn.p1) ||
    (playingField[1] === Turn.p1 && playingField[4] === Turn.p1 && playingField[7] === Turn.p1) ||
    (playingField[2] === Turn.p1 && playingField[5] === Turn.p1 && playingField[8]=== Turn.p1)
  ) {
    players.p1.score++
    return players.p1.name
  } else if (
    (playingField[0] === Turn.p2 && playingField[3] === Turn.p2 && playingField[6] === Turn.p2) ||
    (playingField[1] === Turn.p2 && playingField[4] === Turn.p2 && playingField[7] === Turn.p2) ||
    (playingField[2] === Turn.p2 && playingField[5] === Turn.p2 && playingField[8]=== Turn.p2)
  ) {
    players.p2.score++
    return players.p2.name
  }
}

const diagonalWin = (playingField: Array<'' | Turn>, players: Players): string => {
  if (
    (playingField[0] === Turn.p1 && playingField[4] === Turn.p1 && playingField[8] === Turn.p1) ||
    (playingField[2] === Turn.p1 && playingField[4] === Turn.p1 && playingField[6] === Turn.p1)
  ) {
    players.p1.score++
    return players.p1.name + ' wins'
  } else if (
    (playingField[0] === Turn.p2 && playingField[4] === Turn.p2 && playingField[8] === Turn.p2) ||
    (playingField[2] === Turn.p2 && playingField[4] === Turn.p2 && playingField[6] === Turn.p2)
  ) {
    players.p2.score++
    return players.p2.name + ' wins'
  }
}