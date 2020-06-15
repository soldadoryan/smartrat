import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 900px;
  height: 900px;
  margin: 20px 50px;
  grid-template-columns: repeat(${props => props.tamanho}, 3fr);
  grid-template-rows: repeat(${props => props.tamanho}, 3fr);
  grid-gap: 0px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
`;

export const Button = styled.button`
  padding: 15px;
  color: white;
  font-size: 18px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &.success {
    background-color: #333399;
  }

  &.warning {
    background-color: #ff9900;
  }

  &.error {
    background-color: #cc3300;
  }
`;

export const Description = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 1);
  border: 2px solid #333399;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.15);

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;

    img { 
      width: 75px;
      height: 75px;
      margin: 0 10px;
    }
  }

  p {
    font-size: 20px;
    color: #555;
  }

  h3 { text-transform: uppercase; }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 20px;
      margin-bottom: 10px;
      color: #555;
    }
  }

  .separator { border-top: 2px solid #333399; height: 1px; width: 100%; margin: 20px 0 40px; }

  button { text-transform: uppercase; }
`;