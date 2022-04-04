import React, { useContext, useEffect } from "react"
import { GameContext } from "../../context/GameContext"
import { checkWin } from "../../utils/CheckWin"
import Tile from "../tile/Tile"
import './PlayingField.scss'

const SIZE = 9

const PlayingField = () => {
  const { playingField, players } = useContext(GameContext)
  const winner = checkWin(playingField, players)

  useEffect(() => {
    if (!winner) return
    alert(winner + ' wins')
  }, [winner])

  return (
    <div className="playingfield">
      {[...Array(SIZE)].map((_, i) => (
        <Tile id={i} key={i} light={i%2 === 0}/>
      ))}
    </div>
  )
}

export default PlayingField