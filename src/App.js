import React, { useState } from 'react';

import GlobalStyle from './styles';
import { Container } from './styleds';

import Labirinto from './components/Labirinto';

function App() {
  const [tamanho] = useState(10);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Labirinto tamanho={tamanho} />
      </Container>
    </>
  );
}

export default App;
