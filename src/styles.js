import { createGlobalStyle } from "styled-components";

import bg from './assets/bg.png';

export default createGlobalStyle`
  html { height: 100%; }

  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: 'Acme', sans-serif;

  }

  #root { width: 100%; height: 100%; background: url(${bg}); }

  input, textarea, button { outline: none; font-family: 'Acme', sans-serif; }
`;