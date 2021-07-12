import React, { createContext, useContext, useState } from 'react'

const PontosContext = createContext()

export default function PontosProvider({ children }) {

    const [pontos, setPontos] = useState(0)

    return (
        <PontosContext.Provider
            value={{
                pontos,
                setPontos
            }}
        >
            {children}
        </PontosContext.Provider>
    )
}

export function usePontos() {
    const context = useContext(PontosContext)
    const { pontos, setPontos } = context
    return { pontos, setPontos }
}