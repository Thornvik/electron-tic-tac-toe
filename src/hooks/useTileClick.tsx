import React, { useState } from 'react'

const useTileClick = () =>{
  const [clicked, setClicked] = useState(false)

  const clickHandler = () => {
    if (!clicked) setClicked(true)
  }

  return { clickHandler, clicked }
}

export default useTileClick