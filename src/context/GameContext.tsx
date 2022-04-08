import React, { createContext, ReactElement, useState } from 'react'
import { Props } from '../types/defaults'

export interface Players {
  p1: string,
  p2: string
}

export enum Turn {
  p1 = 1,
  p2 = 2
}

interface GameContextInterface {
  players: Players,
  setPlayers: (arg: Players) => void,
  turn: Turn,
  setTurn: (arg: Turn) => void,
  playingField: Array<'' | Turn>,
  setPlayingField: (arg: Array<'' | Turn>) => void,
  room: string,
  setRoom: (arg: string) => void,
  username: string,
  setUsername: (arg: string) => void
}

export const GameContext = createContext({} as GameContextInterface)

const defultPlayers: Players = {
  p1: 'player one' ,
  p2: 'player two'
}

const defaultPlayingField: Array<'' | Turn> = [
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
  const [turn, setTurn] = useState(Turn.p1)
  const [playingField, setPlayingField] = useState(defaultPlayingField)
  const [players, setPlayers] = useState(defultPlayers)
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  const { children } = props

  const value = {
    players,
    setPlayers,
    turn,
    setTurn,
    playingField,
    setPlayingField,
    room,
    setRoom,
    username,
    setUsername
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}