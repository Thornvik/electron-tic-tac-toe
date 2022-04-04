import React, { useContext, useEffect } from 'react'
import { GameContext, Turn } from '../../context/GameContext'
import useTileClick from '../../hooks/useTileClick'
import './Tile.scss'

interface TileProps {
  light: boolean,
  id: number
}

const Tile = ( props: TileProps) => {
  const { light, id } = props
  const { clicked, clickHandler } = useTileClick()
  const { turn, setTurn, playingField } = useContext(GameContext)

  const playerColor = light ? ' tile_clicked--blue' : ' tile_clicked--red'
  const classes = !clicked ? 'tile' : 'tile' + playerColor

  useEffect(() => {
    if (clicked) {
      playingField[id] = turn
      if (turn === Turn.p1) return setTurn(Turn.p2)
      return setTurn(Turn.p1)
    }
  }, [clicked])

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