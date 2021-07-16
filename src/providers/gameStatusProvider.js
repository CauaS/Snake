import { useContext, useState } from "react"
import GameStatusContext from "../contexts/gameStatusContext"

export default function GameStatusProvider({ children }) {

    const [gameOverStatus, setGameOverStatus] = useState(false);
    const [objetivo, setObjetivo] = useState(5);
    const [level, setLevel] = useState(1);

    return (
        <GameStatusContext.Provider value={{
            gameOverStatus, 
            setGameOverStatus,
            objetivo, 
            setObjetivo,
            level, 
            setLevel
        }}>
            {children}
        </GameStatusContext.Provider>
    )
}

export function useGameStatus() {
    const context = useContext(GameStatusContext)
    const { gameOverStatus,
        setGameOverStatus,
        objetivo,
        setObjetivo,
        level,
        setLevel } = context;

    return { gameOverStatus,
        setGameOverStatus,
        objetivo,
        setObjetivo,
        level,
        setLevel }
};