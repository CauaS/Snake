import React from 'react';
import Routes from '../src/router';
import PontuacaoProvider from './providers/pontuacaoProvider';
import GameStatusProvider from './providers/gameStatusProvider';

function App() {
  return (
    <GameStatusProvider>
      <PontuacaoProvider>
        <Routes />
      </PontuacaoProvider>
    </GameStatusProvider>
  )
}

export default App;

