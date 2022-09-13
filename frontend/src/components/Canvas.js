import React, { useEffect, useRef } from 'react';
import { Paper, styled } from '@mui/material';
import { drawSheep, drawWolf } from '../utils/canvasAnimals';

const StyledCanvas = styled('canvas')({
  border: 'black 1px solid',
  margin: 10,
});

function MyComponent({ sheep, wolf }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef != null) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.height = 500;
      canvasRef.current.width = 500;
      drawSheep(sheep, ctx);
      drawWolf(wolf, ctx);
    }
  }, [sheep, wolf]);

  return (
    <Paper elevation={2}>
      <StyledCanvas ref={canvasRef} />
    </Paper>
  );
}

export default MyComponent;
