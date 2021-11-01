import React, { useState, useEffect } from 'react';
import Step from '../Step';
import { gerarLabirinto, gerarCaminho, posicionarQueijo, mapearLabirinto } from '../../utils/maze';
import { posicionarRato, definirCaminho, gerarRato } from '../../utils/rat';
import { Container, Button, Description } from './styles';
import { toast } from 'react-toastify';

import BannerRat from '../../assets/rat.png';
import BannerCheese from '../../assets/cheese.png';

function Labirinto({ tamanho }) {
  const [maze, setMaze] = useState([]);
  const numberOfRats = 3;
  // Lists
  const [openedList, setOpenedList] = useState([]);
  const [closedList, setClosedList] = useState([]);
  const [usedSteps, setUsedSteps] = useState([]);
  const [wayRat, setWayRat] = useState([]);


  // POSITIONS
  const [rats, setRats] = useState([]);
  const [posXCheese, setPosXCheese] = useState('');
  const [posYCheese, setPosYCheese] = useState('');

  const [showButton, setShowButton] = useState(true);
  const [showIndexes, setShowIndexes] = useState(false);

  useEffect(() => {
    var auxMaze = gerarLabirinto(tamanho);
    const cheese = posicionarQueijo(auxMaze);
    auxMaze = cheese.maze;
    setPosXCheese(cheese.posX);
    setPosYCheese(cheese.posY);
    auxMaze = gerarCaminho(auxMaze, cheese.posX, cheese.posY);

    let auxRats = rats;

    for (var i = 0; i < numberOfRats; i++) {
      const newRat = gerarRato(auxMaze);
      auxRats.push({ posX: newRat.posX, posY: newRat.posY, way: [] });
      auxMaze = newRat.maze;
    }

    auxRats = auxRats.filter(item => item.way.length === 0).map(item => {
      var auxItem = item;
      const response = mapearLabirinto(
        auxMaze,
        { posX: item.posX, posY: item.posY },
        { posX: cheese.posX, posY: cheese.posY },
        [
          {
            posX: 0,
            posY: 0,
            indexDad: null,
            distanciaInicio: 0,
            value: item.posX + item.posY,
          }
        ],
        closedList
      );
      setOpenedList(response.oList);
      setClosedList(response.cList);
      const responseWay = definirCaminho(response.cList, { posX: cheese.posX, posY: cheese.posY }, item.way);
      console.log(responseWay);
      auxItem.way = responseWay;
      setRats(auxRats)
      return auxItem;
    });

    setMaze(auxMaze);
  }, [tamanho]);


  // useEffect(() => {
  //   rats.map(item => {
  //     if (item.posX === posXCheese && item.posY === posYCheese) {
  //       toast.success('🐭🧀 Queijo encontrado!! ', {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true
  //       });
  //       setShowButton(false);
  //     }
  //   })
  // }, [rats]);

  const moverRato = () => {

    setShowButton(false);
    var controlRat = rats[0].way.length - 1;

    setMaze(posicionarRato(maze, rats[0].way[controlRat].posX, rats[0].way[controlRat].posY, rats[0].posX, rats[0].posY));

    rats[0].posX = rats[0].way[controlRat].posX;
    rats[0].posY = rats[0].way[controlRat].posY;

    controlRat = controlRat - 1;

    // if (controlRat < 0) {
    //   clearInterval(loop);
    // }

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