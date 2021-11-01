import { getRandomInt } from '../utils';

export const gerarLabirinto = (tamanho) => {
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
        left: false,
        top: false,
        right: false,
        bottom: false
      });
    }
  }

  return auxMaze;
};

export const posicionarQueijo = (maze) => {
  let auxMaze = maze;

  auxMaze[0][0].isCheese = true;

  return {
    maze: auxMaze,
    posX: 0,
    posY: 0
  }
};

export const gerarCaminho = (maze, linha, coluna) => {

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

export const mapearLabirinto = (maze, cheese, finder, oList, cList) => {
  console.log("Teste de parada", finder, cheese);

  const direcoes = [
    { direction: 'top', isValid: maze[finder.posX][finder.posY].top },
    { direction: 'right', isValid: maze[finder.posX][finder.posY].right },
    { direction: 'bottom', isValid: maze[finder.posX][finder.posY].bottom },
    { direction: 'left', isValid: maze[finder.posX][finder.posY].left },
  ];

  var auxOList = oList;
  var distanciaInicio = 0;
  var distanciaCheese = 0;
  var value = 0;

  direcoes.filter(dir => dir.isValid).map(item => {

    if (item.direction === 'top') {

      if (!inLists(oList, cList, { posX: finder.posX - 1, posY: finder.posY })) {

        distanciaInicio = auxOList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].distanciaInicio + 1;
        distanciaCheese = Math.abs((cheese.posX + cheese.posY) - ((finder.posX - 1) + (finder.posY)));

        value = distanciaInicio + distanciaCheese;

        auxOList = [...auxOList, {
          posX: finder.posX - 1,
          posY: finder.posY,
          posXDad: finder.posX,
          posYDad: finder.posY,
          distanciaInicio,
          value,
        }];

      }

    } else if (item.direction === 'right') {

      if (!inLists(oList, cList, { posX: finder.posX, posY: finder.posY + 1 })) {

        distanciaInicio = auxOList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].distanciaInicio + 1;
        distanciaCheese = Math.abs((cheese.posX + cheese.posY) - ((finder.posX) + (finder.posY + 1)));
        value = distanciaInicio + distanciaCheese;

        auxOList = [...auxOList, {
          posX: finder.posX,
          posY: finder.posY + 1,
          posXDad: finder.posX,
          posYDad: finder.posY,
          distanciaInicio,
          value,
        }];

      }

    } else if (item.direction === 'bottom') {

      if (!inLists(oList, cList, { posX: finder.posX + 1, posY: finder.posY })) {

        distanciaInicio = auxOList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].distanciaInicio + 1;
        distanciaCheese = Math.abs((cheese.posX + cheese.posY) - ((finder.posX + 1) + (finder.posY)));

        value = distanciaInicio + distanciaCheese;

        auxOList = [...auxOList, {
          posX: finder.posX + 1,
          posY: finder.posY,
          posXDad: finder.posX,
          posYDad: finder.posY,
          distanciaInicio,
          value,
        }];
      }

    } else if (item.direction === 'left') {

      if (!inLists(oList, cList, { posX: finder.posX, posY: finder.posY - 1 })) {

        distanciaInicio = auxOList.filter(item => item.posX === finder.posX && item.posY === finder.posY)[0].distanciaInicio + 1;
        distanciaCheese = Math.abs((cheese.posX + cheese.posY) - ((finder.posX) + (finder.posY - 1)));

        value = distanciaInicio + distanciaCheese;

        auxOList = [...auxOList, {
          posX: finder.posX,
          posY: finder.posY - 1,
          posXDad: finder.posX,
          posYDad: finder.posY,
          distanciaInicio,
          value,
        }];

      }

    }

  });

  var auxCList = [...cList, auxOList.filter(s => s.posX === finder.posX || s.posY === finder.posY)[0]];
  auxOList = auxOList.filter(s => s.posX !== finder.posX || s.posY !== finder.posY);

  auxOList.sort((x, y) => {
    if (x.value > y.value) return 1;
    if (x.value < y.value) return -1;
    return 0;
  });
  console.log("OLHA AQUI PANGUA ====>", finder.posX === cheese.posX && finder.posY === cheese.posY);
  if (finder.posX === cheese.posX && finder.posY === cheese.posY) {
    return {
      oList: auxOList,
      cList: auxCList
    };
  }

  if (auxOList.length > 0) {
    return mapearLabirinto(maze, cheese, { posX: auxOList[0].posX, posY: auxOList[0].posY }, auxOList, auxCList);
  } else {
    return {
      oList: auxOList,
      cList: auxCList
    };
  }
}

const inLists = (oList, cList, finder) => {
  const resultOList = oList.filter(item => item.posX === finder.posX && item.posY === finder.posY).length;
  const resultCList = cList.filter(item => item.posX === finder.posX && item.posY === finder.posY).length;

  return (resultOList > 0 || resultCList > 0) ? true : false;
}