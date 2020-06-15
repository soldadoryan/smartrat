export const posicionarRato = (maze, posX, posY) => {
  var auxMaze = retirarRato(maze);

  auxMaze[posX][posY].isRat = true;

  return auxMaze;
};

const retirarRato = (maze) => {
  var auxMaze = maze;

  auxMaze.map(row => {
    row.map(column => column.isRat = false);
  });

  return auxMaze;
};

export const definirCaminho = (cList, finder, way) => {

  var auxWay = [...way, finder];

  if (finder.posX !== 0 || finder.posY !== 0) {
    var dadFinder = {
      posX: cList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].posXDad,
      posY: cList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].posYDad,
    };

    return definirCaminho(cList, { posX: dadFinder.posX, posY: dadFinder.posY }, auxWay);
  }

  return auxWay;
}
