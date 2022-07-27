import React, { useContext, useEffect, useState } from "react"
import { GameContext, Players, Turn } from "../../context/GameContext"
import { UserContext } from "../../context/UserContext"
import GameOverModal from "../gameOverModal/GameOverModal"
import Tiles from "./tiles/Tiles"
import { checkWin } from "../../utils/CheckWin"
import { checkTie } from "../../utils/CheckTie"
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
  const { username } = useContext(UserContext)
  const [winner, setWinner] = useState('')

  const replay = () => {
    socket.emit('replay', [
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

      socket.on('gameEnd', (winner: string) => {
        setGameOver(true)
        if (winner) {
          setWinner(winner + ' wins the game!')
        } else setWinner('The game ends with a tie')
      })
    }
  }, [socket, setPlayers, playingField, replay])

  useEffect(() => {
    if(checkWin(playingField, players)) {
      socket.emit('playerWin', username)
    } else if (checkTie(playingField)) {
      socket.emit('gameTie')
    }
  }, [playingField])

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