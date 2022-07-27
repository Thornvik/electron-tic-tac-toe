import { Turn } from "../context/GameContext"

export const checkTie = (playingField: Array<'' | Turn>) => {
  return !playingField.includes('')
}