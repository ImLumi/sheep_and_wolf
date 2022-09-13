import React, { useEffect, useRef } from 'react';
import { Paper, styled } from '@mui/material';
import { drawSheep, drawWolf } from '../utils/canvasAnimals';

const StyledCanvas = styled('canvas')({
  border: 'black 1px solid',
  margin: 10,
});

function Canvas({
  sheep, wolf, width = 200, height = 200,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef != null) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.height = height;
      canvasRef.current.width = width;
      drawSheep(sheep, ctx);
      drawWolf(wolf, ctx);
    }
  }, [sheep, wolf, width, height]);

  return (
    <Paper elevation={2}>
      <StyledCanvas ref={canvasRef} />
    </Paper>
  );
}

export default Canvas;
