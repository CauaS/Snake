import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

import { useInterval } from '../../useInterval';
import {
  APPLE_START,
  CANVAS_SIZE,
  DIRECTIONS,
  SCALE,
  SNAKE_START,
  SPEED,
  OBJETIVOS
} from '../../constantes';
import { usePontuacao } from '../../providers/pontuacaoProvider.js';
import { useGameStatus } from '../../providers/gameStatusProvider';
import PontuacaoService from '../../services/pontuacaoService';
import { chewSound } from '../../assets/audio/index.js'

import { imagens } from '../../assets/images/index';


function Canvas({ history }) {
  const biteSound = new Audio(chewSound);
  const canvasRef = useRef(null);
  const [objetivoIndex, setObjetivoIndex] = useState(0)
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]); //vai para cima, por que o y = -1
  const [speed, setSpeed] = useState(800);
  const [gameOver, setGameOver] = useState(false);
  const [imagemLevel, setImagemLevel] = useState(imagens[objetivoIndex]);
  const { pontuacao, setPontuacao } = usePontuacao();
  const { setGameOverStatus, setObjetivo, setLevel, objetivo } = useGameStatus();

  useInterval(() => jogo(), speed);


  const verificaLevel = () => {
    if (pontuacao.Pontos >= objetivo && objetivo != OBJETIVOS[2]) {
      setObjetivo(OBJETIVOS[objetivoIndex]);
      setImagemLevel(imagens[objetivoIndex]);
      setLevel(objetivoIndex + 1);
      setObjetivoIndex(objetivoIndex + 1)
    }
  }


  const finalizarJogo = async () => {
    setSpeed(null);
    setGameOver(true);
    await PontuacaoService.insertPontuacao(pontuacao);
    setGameOverStatus(gameOver);
  }

  const iniciarJogo = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setGameOverStatus(gameOver);
    setImagemLevel(imagens[objetivoIndex]);
    setLevel(0);

    setPontuacao({ ...pontuacao, Pontos: 0 });
  };
  const movimentarCobra = ({ keyCode }) => { keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]); }

  const criarMaca = () => apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i]) / SCALE)); // gera um novo lugar para a ma??a, dentor o canvas size;

  const verificarColisao = (parteCobra, cobra = snake) => {
    /*
    parteCobra[0] = cabela * SCALE(para ter o valor correto) >= ao CANVAS_SIZE[0] = x
    {...}
    */
    if (parteCobra[0] * SCALE >= CANVAS_SIZE[0] ||
      parteCobra[0] < 0 ||
      parteCobra[1] * SCALE >= CANVAS_SIZE[1] ||
      parteCobra[1] < 0) return true;

    //verifica se a cabe??a a cobra colidiu nela mesma.
    for (const segmentoDaCobra of cobra) {
      if (parteCobra[0] === segmentoDaCobra[0] && parteCobra[1] === segmentoDaCobra[1]) return true;
    }

    return false;
  }

  const veriricarColisaoComMaca = novaCobra => {
    if (novaCobra[0][0] === apple[0] && novaCobra[0][1] === apple[1]) {
      biteSound.play()
      setPontuacao({ ...pontuacao, Pontos: pontuacao.Pontos + 1 });
      if (speed !== 100) setSpeed(speed => speed - 100);

      let novaMaca = criarMaca();

      //se a nova ma??a for criada no mesmo lugar que a cobra est??;
      while (verificarColisao(novaMaca, novaCobra)) {
        novaMaca = criarMaca();
      }
      setApple(novaMaca);
      return true;
    }

    return false;
  }

  const jogo = async () => {
    const copiaCobra = JSON.parse(JSON.stringify(snake)); // cobra inteira

    //snake[0][0] -> cabe??a (+) dir[0] ->  adiciona a dire????o apra a cabe??a ( dir[0] = x)
    const novaCobraCabeca = [copiaCobra[0][0] + dir[0], copiaCobra[0][1] + dir[1]]

    copiaCobra.unshift(novaCobraCabeca); // adiciona a cabe??a da cobra no inicio do array;
    // copiaCobra.pop();// remove o ultimo elemento da cobra;
    if (verificarColisao(novaCobraCabeca))
      await finalizarJogo();
    if (!veriricarColisaoComMaca(copiaCobra))
      copiaCobra.pop(); // se n??o houve colis??o com a ma??a, retira uma part da cauda da cobra

    setSnake(copiaCobra);// atualiza Snakes
  };

  const criaCobra = (snake, context) => {
    if (pontuacao.Pontos <= OBJETIVOS[0])
      context.fillStyle = "#fff"; //cor da cobra
    else if (pontuacao.Pontos <= OBJETIVOS[1])
      context.fillStyle = "red"; //cor da cobra
    else if (pontuacao.Pontos <= OBJETIVOS[2])
      context.fillStyle = "black"; //cor da cobra

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
    return function limparPontuacao() {
      setPontuacao({ ...pontuacao, Pontos: 0 });
      setLevel(0)
      setObjetivo()
    }
  }, []);

  useEffect(() => {
    setGameOverStatus(gameOver)
    window.addEventListener('keydown', movimentarCobra);

    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]); // limpa o campo do jogo

    verificaLevel();
    criaCobra(snake, context);

    criaMaca(context, apple);
    return () => {
      window.removeEventListener('keydown', movimentarCobra);
    };
  },
    [snake, apple, gameOver, setGameOverStatus]);


  return (
    <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>
      <canvas
        className="canvas"
        style={{
          backgroundImage: `url(${imagemLevel})`,
          backgroundSize: '100% 100%'
        }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <div>
        {gameOver && <button className="btn-jogar-novamente" onClick={iniciarJogo}> Jogar novamente!</button>}
      </div>
    </div>
  )

}

export default Canvas;