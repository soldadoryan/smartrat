import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);  
`;

export const Content = styled.div`
  background-color: white;
  position: absolute;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;

  h1 {
    font-size: 22px;
    margin-bottom: 25px;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    padding: 0 10px;
    border: 1px solid #999;
    margin-bottom: 25px;
  }
`;

export const Button = styled.button`
  padding: 15px;
  color: white;
  font-size: 18px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &.success {
    background-color: #333399;
  }

  &.warning {
    background-color: #ff9900;
  }

  &.error {
    background-color: #cc3300;
  }
`;