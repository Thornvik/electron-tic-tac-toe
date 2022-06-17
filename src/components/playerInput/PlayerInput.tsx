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
  const [roomInput, setRoomInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const { players } = useContext(GameContext)
  const { setUsername } = useContext(GameContext)

  const JoinRoom = () => {
    if (socket) {
      socket.emit('join', { username: usernameInput, room: roomInput, players }, (error: string) => {
        if (error) {
          // handle error
          setUsername('')
          return joinCallback(false)
        }
      })
      joinCallback(true)
    }
    setUsername(usernameInput)
  }

  return (
    <div className="playerinput">
      <input
        className="input"
        type="text"
        placeholder="username"
        onChange={(e) => {setUsernameInput(e.target.value)}}
        value={usernameInput}
      />
      <input
        className="input"
        type="text"
        placeholder="room"
        onChange={(e) => {setRoomInput(e.target.value)}}
        value={roomInput}
      />

      <button
        className="playerinput--join_btn"
        onClick={() => JoinRoom()}
      >
        Join
      </button>
    </div>
  )
}

export default PlayerInput