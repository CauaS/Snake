import React from 'react';
import Routes from '../src/router';
import PontosProvider from './Contexts/pontosContext.js';

function App() {
  return (
    <PontosProvider>
      <Routes />
    </PontosProvider>
  )
}

export default App;
