import { useContext, useState } from 'react'
import { Turn, GameContext } from '../context/GameContext'

const useTileClick = (checked: boolean) => {
  let { playingField, setPlayingField } = useContext(GameContext)
  const [clicked, setClicked] = useState(checked)

  const clickHandler = (id: number, turn: Turn) => {
    if (!clicked) {
      setClicked(true)
      playingField[id] = turn
      setPlayingField(playingField)
    }
  }

  return { clickHandler, clicked }
}

export default useTileClick