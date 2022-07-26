import { useContext } from 'react'
import { Turn, GameContext } from '../context/GameContext'

const useTileClick = () => {
  let { playingField, setPlayingField } = useContext(GameContext)

  const clickHandler = (id: number, turn: Turn) => {
    playingField[id] = turn
    setPlayingField(playingField)
  }

  return { clickHandler }
}

export default useTileClick