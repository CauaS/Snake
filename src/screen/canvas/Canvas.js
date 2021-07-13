import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

import { useInterval } from '../../useInterval';
import {
  APPLE_START,
  CANVAS_SIZE,
  DIRECTIONS,
  SCALE,
  SNAKE_START,
  SPEED
} from '../../constantes';
import { usePontuacao } from '../../providers/pontuacaoProvider.js';
import PontuacaoService from '../../services/pontuacaoService';


function Canvas({ history }) {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]); //vai para cima, por que o y = -1
  const [speed, setSpeed] = useState(800);
  const [gameOver, setGameOver] = useState(false);
  const { pontuacao, setPontuacao } = usePontuacao()


  useInterval(() => jogo(), speed);

  const finalizarJogo = () => {
    setSpeed(null);
    setGameOver(true);
    PontuacaoService.insertPontuacao(pontuacao);
  }

  const movimentarCobra = ({ keyCode }) => { keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]); }

  const criarMaca = () => apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE.canvasHeight + CANVAS_SIZE.canvasWidth) / SCALE)); // gera um novo lugar para a maça, dentor o canvas size;

  const verificarColisao = (parteCobra, cobra = snake) => {
    /*
    parteCobra[0] = cabela * SCALE(para ter o valor correto) >= ao CANVAS_SIZE[0] = x
    {...}
    */
    if (parteCobra[0] * SCALE >= CANVAS_SIZE.canvasWidth ||
      parteCobra[0] < 0 ||
      parteCobra[1] * SCALE >= CANVAS_SIZE.canvasHeight ||
      parteCobra[1] < 0) return true;

    //verifica se a cabeça a cobra colidiu nela mesma.
    for (const segmentoDaCobra of cobra) {
      if (parteCobra[0] === segmentoDaCobra[0] && parteCobra[1] === segmentoDaCobra[1]) return true;
    }

    return false;
  }

  const veriricarColisaoComMaca = novaCobra => {
    if (novaCobra[0][0] === apple[0] && novaCobra[0][1] === apple[1]) {
      setPontuacao({ ...pontuacao, Pontos: pontuacao.Pontos + 1 });
      if (speed !== 100) setSpeed(speed => speed - 100);

      let novaMaca = criarMaca();

      //se a nova maça for criada no mesmo lugar que a cobra está;
      while (verificarColisao(novaMaca, novaCobra)) {
        novaMaca = criarMaca();
      }
      setApple(novaMaca);
      return true;
    }

    return false;
  }

  const jogo = () => {
    const copiaCobra = JSON.parse(JSON.stringify(snake)); // cobra inteira

    //snake[0][0] -> cabeça (+) dir[0] ->  adiciona a direção apra a cabeça ( dir[0] = x)
    const novaCobraCabeca = [copiaCobra[0][0] + dir[0], copiaCobra[0][1] + dir[1]]

    copiaCobra.unshift(novaCobraCabeca); // adiciona a cabeça da cobra no inicio do array;
    // copiaCobra.pop();// remove o ultimo elemento da cobra;
    if (verificarColisao(novaCobraCabeca))
      finalizarJogo();
    if (!veriricarColisaoComMaca(copiaCobra))
      copiaCobra.pop(); // se não houve colisão com a maça, retira uma part da cauda da cobra

    setSnake(copiaCobra);// atualiza Snakes
  };

  const criaCobra = (snake, context) => {
    context.fillStyle = "lightgreen"; //cor da cobra
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1, 50, 50)); // tamanho
  }

  const criaMaca = (context, apple) => {
    var macaImagem = new Image();
    macaImagem.addEventListener('load', function () {
      context.drawImage(macaImagem, apple[0], apple[1], 1, 1); //tamanho
      context.restore();
    }, false);
    macaImagem.src = 'https://i.pinimg.com/originals/a1/ee/97/a1ee9796415e11f066f081f238a3a184.png';
  }

  useEffect(() => {
    window.addEventListener('keydown', movimentarCobra);

    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE.canvasWidth, CANVAS_SIZE.canvasHeight); // limpa o campo do jogo


    criaCobra(snake, context);
    // context.fillStyle = "lightgreen"; //cor da cobra
    // snake.forEach(([x, y]) => context.roundRect(x, y, 1, 1, 50, 50)); // tamanho

    criaMaca(context, apple);
    // context.fillStyle =v "red"; // para a maçã
    // context.fillRect(apple[0], apple[1], 1, 1); //tamanho
    return () => {
      window.removeEventListener('keydown', movimentarCobra);
    };
  },
    [snake, apple, gameOver]);


  return (
    <div>
      <canvas
        className="canvas"
        style={{
          backgroundImage: 'url(https://media.istockphoto.com/vectors/green-grass-texture-background-vector-id514767984?b=1&k=6&m=514767984&s=612x612&w=0&h=5Z-HKBRKfZG3nP1h4mzClKE7lMHrQmPgXej-5QfpydU=)'
        }}
        ref={canvasRef}
        width={`${CANVAS_SIZE.canvasWidth}px`}
        height={`${CANVAS_SIZE.canvasHeight}px`}
      />
      {gameOver && <div> Game Over! </div>}
      {/* <div>
        <button onClick={iniciarJogo}> Iniciar o jogo</button>

        <h1>{score}</h1>
      </div> */}
    </div>
  )

}

export default Canvas;