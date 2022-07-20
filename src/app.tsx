import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import GameField from './components/gameField/GameField'

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(
  <AppProvider>
    <GameField />
  </AppProvider>
)
