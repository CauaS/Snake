import { useContext, useState } from "react"
import GameStatusContext from "../contexts/gameStatusContext"

export default function GameStatusProvider({ children }) {

    const [gameOverStatus, setGameOverStatus] = useState(false)

    return (
        <GameStatusContext.Provider value={{
            gameOverStatus, 
            setGameOverStatus
        }}>
            {children}
        </GameStatusContext.Provider>
    )
}

export function useGameStatus() {
    const context = useContext(GameStatusContext)
    const { gameOverStatus, setGameOverStatus } = context
    return { gameOverStatus, setGameOverStatus }
}