import React from 'react';
import './styles.css';

import Canvas from '../canvas/Canvas';

function Game(){
    return (
        <div className="game-container">
            <div className="pontuacao">
                <div className="info">
                    <h3>Pontuação</h3>
                    <h2>2</h2>
                </div>
                <div className="info">
                    <h3>Objetivo</h3>
                    <h2>10</h2>
                </div>
                <div className="info">
                    <h3>Level</h3>
                    <h2>1</h2>
                </div>
                <div className="info">
                    <img src="http://static.skaip.org/img/emoticons/180x180/f6fcff/snake.gif" alt="snake.gif" />
                </div>
            </div>
            <Canvas />
        </div>
    )
}

export default Game;