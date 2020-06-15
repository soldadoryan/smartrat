import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import Rat from '../../assets/rat.png';
import Cheese from '../../assets/cheese.png';

function Step({ info, showIndexes }) {

  const [classes, setClasses] = useState('');

  const gerarClasses = () => {
    var auxClasses = '';

    if (info.right) auxClasses += 'right ';
    if (info.bottom) auxClasses += 'bottom ';
    if (info.left) auxClasses += 'left ';
    if (info.top) auxClasses += 'top ';

    setClasses(auxClasses);
  };

  useEffect(() => {
    gerarClasses();
  }, []);

  return (
    <Container className={classes}>
      {showIndexes && <span>{`[${info.posX}][${info.posY}]`}</span>}
      {info.isRat && <img className='rat' src={Rat} alt='rato' />}
      {info.isCheese && <img className='cheese' src={Cheese} alt='queijo' />}
    </Container>
  );
}

export default Step;