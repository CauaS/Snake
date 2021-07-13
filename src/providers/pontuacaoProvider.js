import { useContext, useState } from "react"
import PontuacaoContext from "../contexts/pontuacaoContext"

export default function PontuacaoProvider({ children }) {

    const [pontuacao, setPontuacao] = useState({
        Apelido: '',
        Pontos: 0
    })

    return (
        <PontuacaoContext.Provider value={{
            pontuacao,
            setPontuacao
        }}>
            {children}
        </PontuacaoContext.Provider>
    )
}

export function usePontuacao() {
    const context = useContext(PontuacaoContext)
    const { pontuacao, setPontuacao } = context
    return { pontuacao, setPontuacao }
}