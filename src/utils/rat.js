import { getRandomInt } from '../utils';

export const posicionarRato = (maze, posX, posY, oldPosX, oldPosY) => {
  var auxMaze = retirarRato(maze, oldPosX, oldPosY);

  auxMaze[posX][posY].isRat = true;

  return auxMaze;
};

export const gerarRato = (maze) => {
  var isValid = false;
  var auxMaze = maze;

  while (!isValid) {
    var posX = getRandomInt(0, maze.length - 1);
    var posY = getRandomInt(0, maze.length - 1);

    if (auxMaze[posX][posY].isVisitedByGenerator && !auxMaze[posX][posY].isRat) {

      auxMaze[posX][posY].isRat = true;

      isValid = true;
    }
  }

  return {
    maze: auxMaze,
    posX,
    posY,
  }
}

const retirarRato = (maze, posX, posY) => {
  var auxMaze = maze;

  auxMaze[posX][posY].isRat = false;

  return auxMaze;
};

export const definirCaminho = (cList, finder, way) => {
  var auxWay = [...way, finder];

  console.log("LISTA FECHADA: ", cList);

  if (finder.posX !== 0 || finder.posY !== 0) {
    var dadFinder = {
      posX: cList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].posXDad,
      posY: cList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].posYDad,
    };

    return definirCaminho(cList, { posX: dadFinder.posX, posY: dadFinder.posY }, auxWay);
  }

  return auxWay;
}
