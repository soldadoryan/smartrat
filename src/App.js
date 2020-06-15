import React, { useState } from 'react';

import GlobalStyle from './styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './styleds';

import Labirinto from './components/Labirinto';

function App() {
  const [tamanho] = useState(10);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <GlobalStyle />
      <Container>
        <Labirinto tamanho={tamanho} />
      </Container>
    </>
  );
}

export default App;
