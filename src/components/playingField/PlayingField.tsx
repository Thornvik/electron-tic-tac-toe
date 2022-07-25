import React, { useContext, useEffect, useState } from "react"
import { GameContext, Players, Turn } from "../../context/GameContext"
import GameOverModal from "../gameOverModal/GameOverModal"
import Tiles from "./tiles/Tiles"
import './PlayingField.scss'

interface RoomData {
  players: Players,
  room: string,
  users: Array<Users>
}

interface Users {
  id: string,
  username: string,
  room: string
}

interface PlayingFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any
}

const PlayingField = (props: PlayingFieldProps) => {
  const { socket } = props
  const {
    playingField,
    setPlayingField,
    players,
    setPlayers,
    setTurn,
    gameOver,
    setGameOver,
    turn
  } = useContext(GameContext)
  const [winner, setWinner] = useState('')

  const replay = () => {
    socket.emit('playerMove', [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ], turn)
    setWinner('')
    setGameOver(false)
  }

  useEffect(() => {
    if (socket) {
      socket.on('oponentMove', (newPlayingField: Array<'' | Turn>, turn: Turn) => {
        setPlayingField(newPlayingField)
        setTurn(turn)
      })

      socket.on('roomData', (data: RoomData) => {
        setPlayers(data.players)
      })

      socket.on('victory', (winner: string) => {
        setGameOver(true)
        setWinner(winner)
      })
    }
  }, [socket, setPlayers, playingField, replay])

  return (
    <>
      { gameOver && <GameOverModal winner={winner} replay={replay} /> }
      <div className="playingfield_container">
        <div className="player">
          <p>{players.p1.toLocaleUpperCase()}</p>
        </div>
        <div className="player">
          <p>{players.p2.toLocaleUpperCase()}</p>
        </div>
        <Tiles
          socket={socket}
        />
      </div>
    </>
  )
}

export default PlayingField