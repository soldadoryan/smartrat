import React, { useState, useEffect } from 'react';
import Step from '../Step';
import { gerarLabirinto } from '../../utils/maze';
import { verificarPossiveisCaminhos } from '../../utils/rat';
import { Container } from './styles';

function Labirinto({ tamanho }) {
  const [maze, setMaze] = useState([]);

  const [usedSteps, setUsedSteps] = useState([]);

  const [posXCheese, setPosXCheese] = useState('');
  const [posYCheese, setPosYCheese] = useState('');

  const [posXRat, setPosXRat] = useState(0);
  const [posYRat, setPosYRat] = useState(0);

  useEffect(() => {
    setMaze(gerarLabirinto(tamanho, setPosXCheese, setPosYCheese));
  }, [tamanho]);

  useEffect(() => {
    console.log("Mudou");

  }, [posXRat, posYRat]);

  const moverRato = () => {
    const response = verificarPossiveisCaminhos(maze, usedSteps, posXRat, posYRat, posXCheese, posYCheese);

    setUsedSteps(response.usedSteps);
    setMaze(response.maze);
    setPosXRat(response.posXRat);
    setPosYRat(response.posYRat);
  };

  return (
    <>
      <Container tamanho={tamanho}>
        {maze.map(row => (
          <>
            {
              row.map(column => (
                <Step
                  info={column}
                />
              ))
            }
          </>
        ))}
      </Container>
      <button onClick={() => moverRato()}>Próximo passo...</button>
    </>
  );
}

export default Labirinto;