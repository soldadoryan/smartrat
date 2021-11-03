import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    font-size: 12px;
  }
  
  .rat {
    height: 60px;
  }

  .cheese {
    height: 40px;
    
  }

  &.right { border-right-color: rgba(0, 0, 0, 0.1); }
  &.bottom { border-bottom-color: rgba(0, 0, 0, 0.1); }
  &.left { border-left-color: rgba(0, 0, 0, 0.1); }
  &.top { border-top-color: rgba(0, 0, 0, 0.1); }

  /* &.right { border-right: 0; }
  &.bottom { border-bottom: 0; }
  &.left { border-left: 0; }
  &.top { border-top: 0; } */
`;
