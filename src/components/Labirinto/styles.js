import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 600px;
  height: 600px;
  margin: 20px;
  grid-template-columns: repeat(${props => props.tamanho}, 3fr);
  grid-template-rows: repeat(${props => props.tamanho}, 3fr);
  grid-gap: 0px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
`;
