import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import GameField from './components/gameField/GameField'

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(<GameField />)
