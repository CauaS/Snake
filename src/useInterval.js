import { useEffect, useRef } from 'react';

export function useInterval(callback, velocidade) {
  const ultimoCallback = useRef();

  // guarda o ultimo callback.
  useEffect(() => {
    ultimoCallback.current = callback;
  }, [callback]);

  // cria o interval
  useEffect(() => {
    if (velocidade !== null) {
      // senão houver velocidade, o jogo acabou, então retira o interval
      let id = setInterval(
        () =>  ultimoCallback.current(), 
        velocidade
      );
      return () => clearInterval(id);
    }
  }, [velocidade]);
}