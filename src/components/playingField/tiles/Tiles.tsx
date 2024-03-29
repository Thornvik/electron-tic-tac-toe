import React, { useContext, useEffect, useState } from 'react'
import Tile from '../../tile/Tile'
import { GameContext, Turn } from '../../../context/GameContext'

interface TilesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any
}

const Tiles = (props: TilesProps) => {
  const { playingField } = useContext(GameContext)
  const { socket } = props

  const isChecked = (id: number, playingField: Array<'' | Turn>) => {
    if (playingField[id] === '') return false
    if (playingField[id] === 1 || playingField[id] === 2) {
      return true
    }
  }

  return (
    <div className="playingfield">
      {playingField.map((_, i) => (
        <Tile
          id={i}
          key={i}
          light={i % 2 === 0}
          checked={isChecked(i, playingField)}
          socket={socket}
        />
      ))}
    </div>
  )
}

export default Tiles