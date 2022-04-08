import React, { useContext, useEffect } from "react"
import { GameContext, Turn } from "../../context/GameContext"
import { checkWin } from "../../utils/CheckWin"
import Tile from "../tile/Tile"
import './PlayingField.scss'

const SIZE = 9
interface PlayingFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any
}

const PlayingField = (props: PlayingFieldProps) => {
  const { socket } = props
  const { players } = useContext(GameContext)
  let { playingField, room } = useContext(GameContext)
  const winner = checkWin(playingField, players)

  useEffect(() => {
    if (!winner) return
    alert(winner + ' wins')
  }, [winner])

  useEffect(() => {
    if (socket) {
      socket.on('oponentMove', (newPlayingField: Array<'' | Turn>) => {
        playingField = newPlayingField
      })

      socket.on('roomData', (data: any) => {
        room = data.room
      })
    }
  }, [playingField, socket])

  return (
    <div className="playingfield_container">
      <div className="player">
        <p>{players.p1.toLocaleUpperCase()}</p>
      </div>
      <div className="player">
        <p>{players.p2.toLocaleUpperCase()}</p>
      </div>
      <div className="playingfield">
        {[...Array(SIZE)].map((_, i) => (
          <Tile id={i} key={i} light={i%2 === 0} socket={socket} />
        ))}
      </div>
    </div>
  )
}

export default PlayingField