import React from 'react';
import './styles.css';

import Canvas from '../canvas/Canvas';
import GameInfo from '../../components/gameInfo/gameInfo'
import { usePontuacao } from '../../providers/pontuacaoProvider.js';
import { useGameStatus } from '../../providers/gameStatusProvider.js';

function Game({ history }){
    const { pontuacao } = usePontuacao();
    const { gameOverStatus } = useGameStatus();
    
    return (
        <div className="game-container">
            <div className="pontuacao">
                <div className="info">
                    <h3 className="descricao">Apelido</h3>
                    <h2>{pontuacao.Apelido}</h2>
                </div>
                <div className="info">
                    <h3 className="descricao">Score Final</h3>
                    { gameOverStatus 
                        ? <h1>{pontuacao.Pontos}</h1>
                        : <img style={{ width: 80 }} src="https://media.giphy.com/media/dyX9ixfxMpOUGawfdK/giphy.gif" alt="questionMark" />
                    }
                </div>
                <div className="info">
                    { gameOverStatus 
                        ? <img src="https://lh3.googleusercontent.com/proxy/xCuHIoe84oAK_celQuHVNk8Y19XkhjEjhLHSpjDGXi4A2gENrlmIXbm7_6So9VavGFmRWDczeWtseuk1qyQTR5yLkg2dA3lYwmd6A7eVsTlF" alt="snake.gif" />
                        : <img src="http://static.skaip.org/img/emoticons/180x180/f6fcff/snake.gif" alt="snake.gif" />
                    }
                </div>
            </div>
            <div>
                <div className="game-info">
                    <div className="game-info-pontos">
                        <GameInfo infomation={pontuacao.Pontos} description="Pts"/>
                        <GameInfo infomation={10} description="Obj"/>
                        <GameInfo infomation={1} description="Lvl"/>    
                    </div>
                    <div onClick={() => history.push('/scores')}>
                        <GameInfo imageUrl={'https://thumbs.gfycat.com/AssuredRaggedInvisiblerail-small.gif'}/>    
                    </div>
                </div>
                <Canvas />
            </div>
        </div>
    )
}

export default Game;