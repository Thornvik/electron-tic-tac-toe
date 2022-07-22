import React, { useContext, useEffect, useState } from 'react'
import { checkWin } from '../../utils/CheckWin'
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
  const { clickHandler } = useTileClick(checked)
  const [classNames, setClassNames] = useState<string>('tile')
  const { turn, playingField, setPlayingField, players } = useContext(GameContext)
  const { username } = useContext(UserContext)

  const winner = checkWin(playingField, players)

  useEffect(() => {
    if (!winner) return
    socket.emit('playerWin')
  }, [winner])

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
    }
    if (username === players.p2 && turn === Turn.p2) {
      currPlayingField[id] = Turn.p2
      socket.emit('playerMove', currPlayingField, Turn.p1)
      clickHandler(id, turn)
    }

    if(checkWin(playingField, players)) {
      console.log(username)
      socket.emit('playerWin', username)
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
        if (playingField[id] === '') click()
        return
      }}
    />
  )
}

export default Tile