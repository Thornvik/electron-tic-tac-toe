import React, { useContext, useEffect, useState } from 'react'
import { GameContext, Turn } from '../../context/GameContext'
import useTileClick from '../../hooks/useTileClick'
import './Tile.scss'

interface TileProps {
  light: boolean,
  id: number,
  checked?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any,
  disabled?: boolean
}

const Tile = ( props: TileProps) => {
  const { light, id, socket, disabled, checked } = props
  const { clicked, clickHandler } = useTileClick(checked)
  const [classNames, setClassNames] = useState<string>('tile')
  const { turn, setTurn, playingField } = useContext(GameContext)

  const checkClicked = () => {
    if (playingField[id] === '') return

    if (playingField[id] === 1) {
      setClassNames(classNames + ' tile_clicked--cross')
    }

    setClassNames(classNames + ' tile_clicked--circle')
  }

  const click = () => {
    let currPlayingField = playingField
    currPlayingField[id] = turn
    socket.emit('playerMove', currPlayingField)

    clickHandler(id, turn)
    checkClicked()
  }

  useEffect(() => {
    checkClicked()
  }, [playingField])

  return (
    <div
      style={{ backgroundColor: light ? 'rgb(242, 242, 242)' : 'rgb(215, 215, 215)' }}
      className={classNames}
      tabIndex={0}
      onClick={() => {
        if (clicked || disabled || !socket) return
        click()
      }}
    />
  )
}

export default Tile