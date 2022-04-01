import React from 'react'
import useTileClick from '../../hooks/useTileClick'
import './Tile.scss'

interface TileProps {
  light: boolean
}

const Tile = ( props: TileProps) => {
  const { light } = props
  const { clicked, clickHandler } = useTileClick()

  const playerColor = light ? ' tile_clicked--blue' : ' tile_clicked--red'
  const classes = !clicked ? 'tile' : 'tile' + playerColor

  return (
    <div
      style={{ backgroundColor: light ? 'rgb(242, 242, 242)' : 'rgb(215, 215, 215)' }}
      className={classes}
      tabIndex={0}
      onClick={() => clickHandler()}
    />
  )
}

export default Tile