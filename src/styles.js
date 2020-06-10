import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html { height: 100%; }

  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  #root { width: 100%; height: 100%; }

  input, textarea, button { outline: none; }
`;