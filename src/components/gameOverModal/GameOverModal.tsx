import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "../../context/GameContext"
import "./GameOverModal.scss"

interface GameOverModalInterface {
  winner: string
}

const GameOverModal = (props: GameOverModalInterface) => {
  const { winner } = props

  return (
    <div className="gameOverModal--overlay">
      <div className="gameOverModal--box">
        {/* Close modal button */}
        The game has finished, player: {winner} has won
        {/* close and replay button */}
      </div>
    </div>
  )
}

export default GameOverModal