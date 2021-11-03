import React, { useState, useEffect } from 'react';
import Step from '../Step';
import { gerarLabirinto, gerarCaminho, posicionarQueijo, mapearLabirinto } from '../../utils/maze';
import { posicionarRato, definirCaminho, gerarRato } from '../../utils/rat';
import { Container, Button, Description } from './styles';
import { toast } from 'react-toastify';

import BannerRat from '../../assets/rat.png';
import BannerCheese from '../../assets/cheese.png';
import ModalRats from '../ModalRats';

function Labirinto({ tamanho }) {
  const [maze, setMaze] = useState([]);
  const [showModalRats, setShowModalRats] = useState(true);
  const [numberOfRats, setNumberOfRats] = useState(0);

  // Lists
  const [closedList, setClosedList] = useState([]);

  // POSITIONS
  const [rats, setRats] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showIndexes, setShowIndexes] = useState(false);

  useEffect(() => {
    var auxMaze = gerarLabirinto(tamanho);
    const cheese = posicionarQueijo(auxMaze);
    auxMaze = cheese.maze;
    auxMaze = gerarCaminho(auxMaze, cheese.posX, cheese.posY);

    let auxRats = rats;

    if (numberOfRats !== 0) {

      for (var i = 0; i < numberOfRats; i++) {
        const newRat = gerarRato(auxMaze);
        auxRats.push({ posX: newRat.posX, posY: newRat.posY, way: [], control: 1 });
        auxMaze = newRat.maze;
      }

      auxRats.filter(item => item.way.length === 0).map((item, index) => {
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
        setClosedList(response.cList);
        const responseWay = definirCaminho(response.cList, { posX: item.posX, posY: item.posY }, item.way);
        auxRats[index].way = responseWay;
      });

      setRats(auxRats);
      setMaze(auxMaze);
    }
  }, [tamanho, numberOfRats]);


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
    var auxRats = rats;
    auxRats.map((item, index) => {
      const loop = window.setInterval(() => {
        if (item.control < item.way.length) {
          setMaze([]);
          var newMaze = posicionarRato(maze, item.way[item.control].posX, item.way[item.control].posY, item.posX, item.posY);
          item.posX = item.way[item.control].posX;
          item.posY = item.way[item.control].posY;
          item.control += 1;
          setMaze(newMaze);
        } else {
          clearInterval(loop);
        }
      }, 500);
    });

  };

  const start = () => {
    moverRato();
  };

  return (
    <>
      {showModalRats && <ModalRats setNumberRats={setNumberOfRats} closeModal={() => setShowModalRats(false)} />}
      <Description>
        <h1>
          <img src={BannerRat} className='rat' />
          SO/Threads
          <img src={BannerCheese} className='cheese' />
        </h1>

        <p>
          Trabalho de Sistemas Operacionais sobre Threads. O intúito do trabalho é gerar um labirinto
          aleatório e fazer com que os ratinhos encontrem o melhor caminho até o queijo levando em consideração
          os obstáculos e as rotas sem saídas. O cálculo do caminho para cada rato é feito em paralelo simulando Threads.
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
          <Button className='warning' onClick={() => setShowIndexes(!showIndexes)}>
            {!showIndexes ? 'Mostrar índices' : 'Esconder índices'}
          </Button>
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