import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"
import './GameField.scss'
import PlayingField from '../playingField/PlayingField'
import { GameProvider } from '../../context/GameContext'

const ENDPOINT = "http://localhost:3001/"

const GameField = () => {
  const [socket, setSocket] = useState(null)

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
        {/* <p>
          {response}
        </p> */}
        <PlayingField socket={socket} />
      </div>
    </GameProvider>
  )
}

export default GameField

// Refused to connect to '<URL>' because it violates the following Content Security Policy directive: "default-src 'self' 'unsafe-inline' data:". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.

// Access to XMLHttpRequest at 'http://127.0.0.1:4001/socket.io/?EIO=4&transport=polling&t=N_-3bSR' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000/' that is not equal