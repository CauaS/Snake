import React from "react"
import { silver, gold } from "../../assets/imagensPodio"
import './styles.css'
const Score = (props) => {
    const getCrown = () => {
        switch (props.index) {
            case 0: return (<img src={gold}></img>)
            case 1: return (<img src={silver}></img>)
            default: return (<div></div>)
        }
    }
    return (
        <div className="jogador-score">
            <div style={{
                width: '60%',
                display: "flex",
                justifyContent : 'center',
                alignItems:'center',
                flexDirection:'column'
            }}>
                <span className="jogador-nome">Jogador : {props.player.Apelido}</span>
                <p className="jogador-pontos">Pontuação : {props.player.Pontos}</p>
            </div>
            <div>
                {getCrown()}
            </div>
        </div>
    )
}

export default Score