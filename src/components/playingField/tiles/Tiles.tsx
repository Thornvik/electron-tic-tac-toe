import React from 'react'
import Tile from '../../tile/Tile'
import { Turn } from '../../../context/GameContext'

interface TilesProps {
  currPlayingField: Array<'' | Turn>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any
}

const Tiles = (props: TilesProps) => {
  const { currPlayingField, socket } = props

  const isChecked = (id: number, playingField: Array<'' | Turn>) => {
    if (playingField[id] === '') return false
    if (playingField[id] === 1 || playingField[id] === 2) {
      return true
    }
  }

  return (
    <div className="playingfield">
      {currPlayingField.map((_, i) => (
        <Tile
          id={i}
          key={i}
          light={i % 2 === 0}
          checked={isChecked(i, currPlayingField)}
          socket={socket}
        // disabled={!isPlayersTurn()}
        />
      ))}
    </div>
  )
}

export default Tiles