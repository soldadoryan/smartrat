import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Backdrop, Content, Button } from './styles';


function ModalRats({ setNumberRats, closeModal }) {
  const [rats, setRats] = useState();


  const handleChangeNumberRats = () => {
    if (rats < 99 && rats > 0) {

      setNumberRats(rats);
      closeModal();
    } else {
      toast.error("⚠️ Insira um número entre 0 e 99!");
    }
  }

  return (
    <Container>
      <Backdrop />
      <Content>
        <h1>Quantos ratos serão adicionados ao labirinto?</h1>
        <input type="number" min={0} max={99} value={rats} onChange={e => setRats(e.target.value)} placeholder="Digite o número de ratos" />
        <Button className='success' onClick={handleChangeNumberRats}>Salvar</Button>
      </Content>
    </Container>
  );
}

export default ModalRats;