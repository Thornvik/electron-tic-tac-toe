import React, { useContext, useEffect, useState } from 'react'
import { GameContext, Turn } from '../../context/GameContext'
import useTileClick from '../../hooks/useTileClick'
import './Tile.scss'

interface TileProps {
  light: boolean,
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any,
  disabled?: boolean
}

const Tile = ( props: TileProps) => {
  const { light, id, socket, disabled } = props
  const { clicked, clickHandler } = useTileClick()
  const [classNames, setClassNames] = useState<string>('tile')
  const { turn, setTurn, playingField } = useContext(GameContext)


  useEffect(() => {
    if (clicked) {
      playingField[id] = turn
      if (turn === Turn.p1) {
        setClassNames(classNames + ' tile_clicked--cross')
        return setTurn(Turn.p2)
      }
      setClassNames(classNames + ' tile_clicked--circle')
      return setTurn(Turn.p1)
    }
  }, [clicked, socket])

  return (
    <div
      style={{ backgroundColor: light ? 'rgb(242, 242, 242)' : 'rgb(215, 215, 215)' }}
      className={classNames}
      tabIndex={0}
      onClick={() => {
        if (!disabled) clickHandler()
      }}
    />
  )
}

export default Tile