import React, { useEffect, useState } from "react";
import PontuacaoService from "../../services/pontuacaoService.js";

import './styles.css';

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
            <div 
                className="jogador-score" 
                key={index}
            >
                <span className="jogador-nome">Jogador : {p.Apelido}</span>
                <p className="jogador-pontos">Pontuação : {p.Pontos}</p>
            </div>
        ))
    }

    return (
        <div className="scores-container">
            <h1 style={{ color: 'green'}}>Os Melhores</h1>
                {
                    getPontuacoesTemplate()
                }
        </div>
    )
}

export default Scores;
