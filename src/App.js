import React from 'react';
import Routes from '../src/router';
import PontuacaoProvider from './providers/pontuacaoProvider';

function App() {
  return (
    <PontuacaoProvider>
      <Routes />
    </PontuacaoProvider>
  )
}

export default App;
