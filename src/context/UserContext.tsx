import React, { createContext, ReactElement, useState } from 'react'
import { Props } from '../types/defaults'

interface UserContextInterface {
  room: string,
  setRoom: (arg: string) => void,
  username: string,
  setUsername: (arg: string) => void,
}

export const UserContext = createContext({} as UserContextInterface)

export const UserProvider = (props: Props): ReactElement => {
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  const { children } = props

  const value = {
    room,
    setRoom,
    username,
    setUsername
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}