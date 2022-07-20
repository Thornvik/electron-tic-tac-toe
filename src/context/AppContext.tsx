import React, { createContext, ReactElement, useState } from 'react'
import { Props } from '../types/defaults'

interface AppContextInterface {
  error: string | undefined
  setError: (arg: string | undefined) => void
}

export const AppContext = createContext({} as AppContextInterface)

export const AppProvider = (props: Props): ReactElement => {
  const [error, setError] = useState(undefined)

  const { children } = props

  const value = {
    error,
    setError
  }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}