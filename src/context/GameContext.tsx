import React, { createContext, ReactElement, useState } from 'react'
import { Props } from '../types/defaults'

export interface Players {
  p1: {name: string},
  p2: {name: string}
}

export enum Turn {
  p1 = 1,
  p2 = 2
}

interface GameContextInterface {
  players: Players,
  turn: Turn,
  playingField: Array<'' | Turn>,
  setTurn: (arg: Turn) => void,
  room: string
}

export const GameContext = createContext({} as GameContextInterface)

const players: Players = {
  p1: { name: 'player one' },
  p2: { name: 'player two' }
}

const playingField: Array<'' | Turn> = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

export const GameProvider = (props: Props): ReactElement => {
  const [currPlayer, setCurrPlayer] = useState<Turn>(Turn.p1)

  const { children } = props

  const value = {
    players, turn: currPlayer, playingField, setTurn: setCurrPlayer, room: ''
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}