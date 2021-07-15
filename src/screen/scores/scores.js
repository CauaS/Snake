import React, { useEffect, useState } from "react";
import PontuacaoService from "../../services/pontuacaoService.js";


const Scores = () => {
    const [pontuacoes, setPontuacoes] = useState([])
    
    useEffect(() => {
        async function fetchData(){
            setPontuacoes(await PontuacaoService.getPontuacoes())
        }

        fetchData()
    }, [])

    const getPontuacoesTemplate = () => {
        return pontuacoes.map((p,index) => (
            <div key={index}>
                <h2>Jogador : {p.Apelido}</h2>
                <p>Pontuação : {p.Pontos}</p>
            </div>
        ))
    }

    return (
        <div>
            <h1>Leader Boards</h1>
                {
                    getPontuacoesTemplate()
                }
        </div>
    )
}

export default Scores;
