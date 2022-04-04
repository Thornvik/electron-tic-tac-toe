import React from 'react'
import './GameField.scss'
import PlayingField from '../playingField/PlayingField'
import { GameProvider } from '../../context/GameContext'

const GameField = () => (
  <GameProvider>
    <div className='gamefield'>
      <PlayingField />
    </div>
  </GameProvider>
)

export default GameField