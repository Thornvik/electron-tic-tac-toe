import React, { useContext, useState } from "react"
import { GameContext } from "../../context/GameContext"
import './PlayerInput.scss'

interface PlayerInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any,
  joinCallback: (arg: boolean) => void
}

const PlayerInput = (props: PlayerInputProps) => {
  const { socket, joinCallback } = props
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const { players } = useContext(GameContext)

  const JoinRoom = () => {
    if (socket) {
      socket.emit('join', { username, room, players }, (error: string) => {
        if (error) {
          // handle error
          return joinCallback(false)
        }
      })

      joinCallback(true)
    }
  }

  return (
    <div className="playerinput">
      <input
        className="input"
        type="text"
        placeholder="username"
        onChange={(e) => {setUsername(e.target.value)}}
        value={username}
      />
      <input
        className="input"
        type="text"
        placeholder="room"
        onChange={(e) => {setRoom(e.target.value)}}
        value={room}
      />

      <button
        className="playerinput--join_btn"
        onClick={() => JoinRoom()}
      >
        Join
      </button>

      {/* <button>Play offline</button> */}
    </div>
  )
}

export default PlayerInput