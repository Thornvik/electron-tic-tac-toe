import React, { useContext, useEffect, useState } from "react"
import { GameContext, Players, Turn } from "../../context/GameContext"
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
  let { playingField, room, players, turn } = useContext(GameContext)
  const [usersInRoom, setUsersInRoom] = useState() as Array<any>
  const [playersToDisplay, setPlayersToDisplay] = useState<Players>(players)
  const winner = checkWin(playingField, players)

  const isPlayersTurn  = () => {
    if (usersInRoom) {
      if (turn === Turn.p1 && (usersInRoom[0].username === playersToDisplay.p1)) {
        return true
      } else return false
    }
  }

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
        setUsersInRoom(data.users)
        setPlayersToDisplay(data.players)
      })
    }
  }, [playingField, socket, setPlayersToDisplay])

  return (
    <div className="playingfield_container">
      <div className="player">
        <p>{playersToDisplay.p1.toLocaleUpperCase()}</p>
      </div>
      <div className="player">
        <p>{playersToDisplay.p2.toLocaleUpperCase}</p>
      </div>
      <div className="playingfield">
        {[...Array(SIZE)].map((_, i) => (
          <Tile id={i} key={i} light={i%2 === 0} socket={socket} disabled={!isPlayersTurn()} />
        ))}
      </div>
    </div>
  )
}

export default PlayingField