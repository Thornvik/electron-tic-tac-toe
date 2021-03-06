import React, { useContext, useEffect } from "react"
import { GameContext, Players, Turn } from "../../context/GameContext"
import { checkWin } from "../../utils/CheckWin"
import './PlayingField.scss'
import Tiles from "./tiles/Tiles"

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
  let { playingField, setPlayingField, players, setPlayers, setTurn } = useContext(GameContext)
  const winner = checkWin(playingField, players)

  useEffect(() => {
    if (!winner) return
    alert(winner + ' wins')
  }, [winner])

  useEffect(() => {
    if (socket) {
      socket.on('oponentMove', (newPlayingField: Array<'' | Turn>, turn: Turn) => {
        setPlayingField(newPlayingField)
        setTurn(turn)
      })

      socket.on('roomData', (data: RoomData) => {
        setPlayers(data.players)
      })
    }

  }, [socket, setPlayers, playingField])

  return (
    <div className="playingfield_container">
      <div className="player">
        <p>{players.p1.toLocaleUpperCase()}</p>
      </div>
      <div className="player">
        <p>{players.p2.toLocaleUpperCase()}</p>
      </div>
      <Tiles
        currPlayingField={playingField}
        socket={socket}
      />
    </div>
  )
}

export default PlayingField