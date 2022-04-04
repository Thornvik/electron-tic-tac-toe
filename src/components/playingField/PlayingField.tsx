import Tile from "../tile/Tile"
import React from "react"
import './PlayingField.scss'

const SIZE = 9

const PlayingField = () => {
  return (
    <div className="playingfield">
      {[...Array(SIZE)].map((_, i) => (
        <Tile light={i%2 === 0}/>
      ))}
    </div>
  )
}

export default PlayingField