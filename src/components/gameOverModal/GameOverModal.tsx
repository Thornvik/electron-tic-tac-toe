import React from "react"
import "./GameOverModal.scss"

interface GameOverModalInterface {
  winner: string
  replay: () => void
}

const GameOverModal = (props: GameOverModalInterface) => {
  const { winner, replay } = props

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="gameOverModal--overlay">
      <div className="gameOverModal--box">
        <div
          onClick={() => reloadPage()}
          className="close--btn"
        >
          &#10060;
        </div>
        <p>{winner} has won</p>
        <div className="replayOrCancle--container">
          <div
            onClick={() => reloadPage()}
            className="cancle--btn"
          >
            cancle
          </div>
          <div
            onClick={() => replay()}
            className="replay--btn"
          >
            replay
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal