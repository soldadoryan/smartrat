import { posicionarRato } from './rat';
import { getRandomInt } from '../utils';

export const gerarLabirinto = (tamanho, setPosXCheese, setPosYCheese) => {
  var auxMaze = [];

  for (let i = 0; i < tamanho; i++) {
    auxMaze[i] = [];

    for (let y = 0; y < tamanho; y++) {
      auxMaze[i].push({
        posX: i,
        posY: y,
        isRat: false,
        isCheese: false,
        isVisitedByGenerator: false,
        isVisited: false,
        left: false,
        top: false,
        right: false,
        bottom: false
      });
    }
  }

  const initialPosX = 0, initialPosY = 0;

  auxMaze = posicionarRato(auxMaze, initialPosX, initialPosY);
  auxMaze = gerarCaminho(auxMaze, initialPosX, initialPosY);
  auxMaze = posicionarQueijo(auxMaze, setPosXCheese, setPosYCheese);

  return auxMaze;
};

export const posicionarQueijo = (maze, setPosXCheese, setPosYCheese) => {


  const posX = getRandomInt(0, maze.length - 1);
  const posY = getRandomInt(0, maze.length - 1);


  var auxMaze = maze;

  if (auxMaze[posX][posY].isVisitedByGenerator && !auxMaze[posX][posY].isRat) {

    auxMaze[posX][posY].isCheese = true;
    setPosXCheese(posX);
    setPosYCheese(posY);

    return auxMaze;
  }

  return posicionarQueijo(auxMaze);
};

const gerarCaminho = (maze, linha, coluna) => {

  const direcoes = [
    { direction: 'right', isUsed: false },
    { direction: 'bottom', isUsed: false },
    { direction: 'left', isUsed: false },
    { direction: 'top', isUsed: false }
  ];

  var direcao;
  var randomNumber;

  var auxMaze = maze;
  var count_direcoes = 0;

  auxMaze[linha][coluna].isVisitedByGenerator = true;

  while (count_direcoes < direcoes.length) {

    randomNumber = getRandomInt(0, direcoes.length - 1);


    if (!direcoes[randomNumber].isUsed) {
      auxMaze = moverGerador(auxMaze, direcoes[randomNumber].direction, linha, coluna)
    }

    count_direcoes++;

  }

  return auxMaze;

};

const moverGerador = (maze, direcao, linha, coluna) => {


  if (direcao === 'right') {
    var proximaColuna = coluna + 1;

    maze[linha][coluna].isVisitedByGenerator = true;

    if (proximaColuna < maze.length && !verificarStep(maze[linha][proximaColuna])) {
      maze[linha][coluna].right = true;
      maze[linha][proximaColuna].left = true;

      return gerarCaminho(maze, linha, proximaColuna);
    }
  } else if (direcao === 'bottom') {
    var proximaLinha = linha + 1;

    if (proximaLinha < maze.length && !verificarStep(maze[proximaLinha][coluna])) {
      maze[linha][coluna].bottom = true;
      maze[proximaLinha][coluna].top = true;

      return gerarCaminho(maze, proximaLinha, coluna);
    }
  } else if (direcao === 'left') {
    var proximaColuna = coluna - 1;

    if (proximaColuna >= 0 && !verificarStep(maze[linha][proximaColuna])) {
      maze[linha][coluna].left = true;
      maze[linha][proximaColuna].right = true;

      return gerarCaminho(maze, linha, proximaColuna);
    }
  } else if (direcao === 'top') {
    var proximaLinha = linha - 1;

    if (proximaLinha >= 0 && !verificarStep(maze[proximaLinha][coluna])) {
      maze[linha][coluna].top = true;
      maze[proximaLinha][coluna].bottom = true;

      return gerarCaminho(maze, proximaLinha, coluna);
    }
  }

  return maze;
};

const verificarStep = step => {
  return step.isVisitedByGenerator;
}

