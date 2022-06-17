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
    return players.p1
  } else if (
    (playingField[0] === Turn.p2 && playingField[1] === Turn.p2 && playingField[2] === Turn.p2) ||
    (playingField[3] === Turn.p2 && playingField[4] === Turn.p2 && playingField[5] === Turn.p2) ||
    (playingField[6] === Turn.p2 && playingField[7] === Turn.p2 && playingField[8] === Turn.p2)
  ) {
    return players.p2
  }
}

const verticalWin = (playingField: Array<'' | Turn>, players: Players): string => {
  if (
    (playingField[0] === Turn.p1 && playingField[3] === Turn.p1 && playingField[6] === Turn.p1) ||
    (playingField[1] === Turn.p1 && playingField[4] === Turn.p1 && playingField[7] === Turn.p1) ||
    (playingField[2] === Turn.p1 && playingField[5] === Turn.p1 && playingField[8]=== Turn.p1)
  ) {
    return players.p1
  } else if (
    (playingField[0] === Turn.p2 && playingField[3] === Turn.p2 && playingField[6] === Turn.p2) ||
    (playingField[1] === Turn.p2 && playingField[4] === Turn.p2 && playingField[7] === Turn.p2) ||
    (playingField[2] === Turn.p2 && playingField[5] === Turn.p2 && playingField[8]=== Turn.p2)
  ) {
    return players.p2
  }
}

const diagonalWin = (playingField: Array<'' | Turn>, players: Players): string => {
  if (
    (playingField[0] === Turn.p1 && playingField[4] === Turn.p1 && playingField[8] === Turn.p1) ||
    (playingField[2] === Turn.p1 && playingField[4] === Turn.p1 && playingField[6] === Turn.p1)
  ) {
    return players.p1 + ' wins'
  } else if (
    (playingField[0] === Turn.p2 && playingField[4] === Turn.p2 && playingField[8] === Turn.p2) ||
    (playingField[2] === Turn.p2 && playingField[4] === Turn.p2 && playingField[6] === Turn.p2)
  ) {
    return players.p2 + ' wins'
  }
}