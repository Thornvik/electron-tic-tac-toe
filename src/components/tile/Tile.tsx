import React, { useContext, useEffect, useState } from 'react'
import { GameContext, Turn } from '../../context/GameContext'
import { UserContext } from '../../context/UserContext'
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

const Tile = (props: TileProps) => {
  const { light, id, socket, disabled, checked } = props
  const { clicked, clickHandler } = useTileClick(checked)
  const [classNames, setClassNames] = useState<string>('tile')
  const { turn, playingField, players } = useContext(GameContext)
  const { username } = useContext(UserContext)

  const checkClicked = () => {
    if (playingField[id] === '') return

    if (playingField[id] === Turn.p1) {
      return setClassNames(classNames + ' tile_clicked--cross')
    }

    return setClassNames(classNames + ' tile_clicked--circle')
  }

  const click = () => {
    let currPlayingField = playingField

    if (username === players.p1 && turn === Turn.p1) {
      currPlayingField[id] = Turn.p1
      socket.emit('playerMove', currPlayingField, Turn.p2)
      clickHandler(id, turn)
      checkClicked()
    }
    if (username === players.p2 && turn === Turn.p2) {
      currPlayingField[id] = Turn.p2
      socket.emit('playerMove', currPlayingField, Turn.p1)
      clickHandler(id, turn)
      checkClicked()
    }
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