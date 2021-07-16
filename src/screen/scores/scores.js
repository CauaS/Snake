import React, { useEffect, useState } from "react";
import PontuacaoService from "../../services/pontuacaoService.js";

import './styles.css';

import { silver } from "../../assets/imagensPodio/index.js";
import Score from "../../components/score/score.js";

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
            <Score key={index} player={p} index={index}></Score>
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
