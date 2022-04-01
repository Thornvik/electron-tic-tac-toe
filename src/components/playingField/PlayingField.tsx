import Tile from "../tile/Tile"
import React from "react"
import './PlayingField.scss'

const PlayingField = () => {
  const size = [1,2,3,4,5,6,7,8,9]

  return (
    <div className="playingfield">
      { size.map((_, i) => (
        <Tile light={i%2 === 0}/>
      ))}
    </div>
  )
}

export default PlayingField