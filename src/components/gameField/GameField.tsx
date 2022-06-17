import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"
import './GameField.scss'
import PlayingField from '../playingField/PlayingField'
import { GameProvider } from '../../context/GameContext'
import PlayerInput from '../playerInput/PlayerInput'

const ENDPOINT = "http://localhost:3001/"

const GameField = () => {
  const [socket, setSocket] = useState(null)
  // prep for adding online and local
  const [isOnline, setIsOnline] = useState(false)
  // const [isLocal, setIsLocal] = useState(false)

  // todo: figure out which type to use instead of any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect((): any => {
    const newSocket = socketIOClient(ENDPOINT)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <GameProvider>
      <div className='gamefield'>
        { !isOnline && (
          <PlayerInput socket={socket} joinCallback={setIsOnline} />
        )}
        { isOnline && <PlayingField socket={socket} />}
      </div>
    </GameProvider>
  )
}

export default GameField