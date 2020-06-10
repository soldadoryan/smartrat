export const posicionarRato = (maze, posX, posY) => {
  var auxMaze = maze;

  auxMaze[posX][posY].isRat = true;

  return auxMaze;
};

export const verificarPossiveisCaminhos = (maze, usedSteps, posX, posY, posXCheese, posYCheese) => {

  // console.log(posX + " " + posY);

  const direcoes = [
    { direction: 'top', isValid: maze[posX][posY].top },
    { direction: 'right', isValid: maze[posX][posY].right },
    { direction: 'bottom', isValid: maze[posX][posY].bottom },
    { direction: 'left', isValid: maze[posX][posY].left },
  ];

  var auxUsedSteps = usedSteps;

  direcoes.filter(dir => dir.isValid).map(item => {
    if (item.direction !== auxUsedSteps.filter(s => posX === s.posX && posY === s.posY)[0].dadDir) {


      if (item.direction === 'top') {

        if ((posX - 1) >= 0) {

          auxUsedSteps = [...auxUsedSteps, {
            posX: posX - 1,
            posY,
            dadPosX: posX,
            dadPosY: posY,
            dadDir: 'bottom',
            isVisited: (posX - 1 === 0 && posY === 0) ? true : false,
          }];

        }

      } else if (item.direction === 'right') {

        auxUsedSteps = [...auxUsedSteps, {
          posX,
          posY: posY + 1,
          dadPosX: posX,
          dadPosY: posY,
          dadDir: 'left',
          isVisited: (posX === 0 && posY + 1 === 0) ? true : false,
        }];

      } else if (item.direction === 'bottom') {

        auxUsedSteps = [...auxUsedSteps, {
          posX: posX + 1,
          posY,
          dadPosX: posX,
          dadPosY: posY,
          dadDir: 'top',
          isVisited: (posX + 1 === 0 && posY === 0) ? true : false,
        }];

      } else if (item.direction === 'left') { // left

        auxUsedSteps = [...auxUsedSteps, {
          posX,
          posY: posY - 1,
          dadPosX: posX,
          dadPosY: posY,
          dadDir: 'right',
          isVisited: (posX === 0 && posY - 1 === 0) ? true : false,
        }];
      }

    }
  });
  console.log("===============================");

  return moverRato(maze, auxUsedSteps, posX, posY, posXCheese, posYCheese);
};

export const retirarRato = (maze) => {
  var auxMaze = maze;

  auxMaze.map(row => {
    row.map(column => column.isRat = false);
  });

  return auxMaze;
};

export const moverRato = (maze, usedSteps, posX, posY, posXCheese, posYCheese) => {

  console.log(posX + " " + posY);

  let menorValor = Number.MAX_VALUE, menorIndex;

  var auxUsedSteps = usedSteps;

  console.log("==============================================");
  console.log(auxUsedSteps);

  auxUsedSteps.map((step, index) => {
    if (!step.isVisited) {

      var resultItem = step.posX + step.posY;
      var resultCheese = posXCheese + posYCheese;
      var result = resultCheese - resultItem;

      if (result < menorValor) {
        menorValor = result;
        menorIndex = index;
      }

    }
  });


  console.log("==============================================");
  console.log("=== Escolheu: " + menorIndex);

  const item = auxUsedSteps[menorIndex];

  if (item.dadPosX === posX && item.dadPosY === posY) {
    var auxMaze = retirarRato(maze);

    auxUsedSteps.filter(s => s.posX === item.posX && s.posY === item.posY)[0].isVisited = true;

    return {
      maze: posicionarRato(auxMaze, item.posX, item.posY),
      usedSteps: auxUsedSteps,
      posXRat: item.posX,
      posYRat: item.posY,
    }
  } else {
    console.log("Não encontrou saída!!");

    return {
      maze,
      usedSteps,
      posXRat: posX,
      posYRat: posY
    };
  }
}


