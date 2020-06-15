import React, { useState, useEffect } from 'react';
import Step from '../Step';
import { gerarLabirinto, gerarCaminho, posicionarQueijo, mapearLabirinto } from '../../utils/maze';
import { posicionarRato, definirCaminho } from '../../utils/rat';
import { Container, Button, Description } from './styles';
import { toast } from 'react-toastify';

import BannerRat from '../../assets/rat.png';
import BannerCheese from '../../assets/cheese.png';

function Labirinto({ tamanho }) {
  const [maze, setMaze] = useState([]);
  const [numberStep, setNumberStep] = useState(0);

  // Lists
  const [openedList, setOpenedList] = useState([]);
  const [closedList, setClosedList] = useState([]);
  const [usedSteps, setUsedSteps] = useState([]);
  const [wayRat, setWayRat] = useState([]);


  // POSITIONS
  const [posXRat, setPosXRat] = useState(0);
  const [posYRat, setPosYRat] = useState(0);
  const [posXFinder, setPosXFinder] = useState(0);
  const [posYFinder, setPosYFinder] = useState(0);
  const [posXCheese, setPosXCheese] = useState('');
  const [posYCheese, setPosYCheese] = useState('');

  const [showButton, setShowButton] = useState(true);
  const [showIndexes, setShowIndexes] = useState(false);

  useEffect(() => {
    var auxMaze = gerarLabirinto(tamanho);
    auxMaze = posicionarRato(auxMaze, posXRat, posYRat);
    auxMaze = gerarCaminho(auxMaze, posXRat, posYRat);
    const cheese = posicionarQueijo(auxMaze);

    setPosXCheese(cheese.posX);
    setPosYCheese(cheese.posY);

    setMaze(cheese.maze);

    const response = mapearLabirinto(
      auxMaze,
      { posX: cheese.posX, posY: cheese.posY },
      { posX: posXFinder, posY: posYFinder },
      [
        {
          posX: 0,
          posY: 0,
          indexDad: null,
          distanciaInicio: 0,
          value: cheese.posX + cheese.posY,
        }
      ],
      closedList
    );

    setOpenedList(response.oList);
    setClosedList(response.cList);

    const responseWay = definirCaminho(response.cList, { posX: cheese.posX, posY: cheese.posY }, wayRat);

    setWayRat(responseWay);
  }, [tamanho]);

  useEffect(() => {

    if (posXRat === posXCheese && posYRat === posYCheese) {
      toast.success('🐭🧀 Queijo encontrado!! ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setShowButton(false);
    }

  }, [posXRat, posYRat]);

  const moverRato = () => {
    setShowButton(false);
    var controlRat = wayRat.length - 1;

    var loop = window.setInterval(() => {
      setMaze(posicionarRato(maze, wayRat[controlRat].posX, wayRat[controlRat].posY));

      setPosXRat(wayRat[controlRat].posX);
      setPosYRat(wayRat[controlRat].posY);

      controlRat = controlRat - 1;

      if (controlRat < 0)
        clearInterval(loop);
    }, 500);
  };

  const start = () => {
    moverRato();
  };

  return (
    <>
      <Description>
        <h1>
          <img src={BannerRat} className='rat' />
          SMART RAT - A* (PATHFINDER)
          <img src={BannerCheese} className='cheese' />
        </h1>

        <p>
          Trabalho de inteligência artificial sobre busca heurística. O intúito do trabalho é gerar um labirinto
          aleatório e fazer com que o ratinho encontre sozinho o melhor caminho até o queijo levando em consideração
          os obstáculos e as rotas sem saídas.
        </p>

        <h3>Integrantes: </h3>

        <ul>
          <li>Juan Shelton</li>
          <li>Luanne Ferreira</li>
          <li>Ryan Drumond</li>
        </ul>

        {showButton && <div className="separator"></div>}

        <div className="buttons">
          {showButton && <Button className='success' onClick={() => start()}>Encontrar o queijo</Button>}
          {showButton && <Button className='error' onClick={() => window.location = '/'}>Gerar novo labirinto</Button>}
          {showButton && (<Button className='warning' onClick={() => setShowIndexes(!showIndexes)}>
            {!showIndexes ? 'Mostrar índices' : 'Esconder índices'}
          </Button>)}
        </div>

      </Description>

      <Container tamanho={tamanho}>
        {maze.map(row => (
          <>
            {
              row.map(column => (
                <Step
                  info={column}
                  showIndexes={showIndexes}
                />
              ))
            }
          </>
        ))}
      </Container>

    </>
  );
}

export default Labirinto;