import React, { useState } from 'react';
import {
  Box, Button, ButtonGroup, Paper, Slider, Typography,
} from '@mui/material';

function Settings({ disabled, startSimulation, stopSimulation }) {
  const [formData, setFormData] = useState({
    sheepCount: 20, speed: 1, width: 300, height: 300,
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startSimulation(formData);
    // console.log(formData);
  };

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
      onSubmit={handleSubmit}
    >
      <Box sx={{
        display: 'flex',
        gap: 5,
        p: 5,
      }}
      >
        <Box>
          <Box width={150}>
            <Typography>bárányok száma:</Typography>
            <Slider onChange={handleChange} disabled={disabled} name="sheepCount" value={formData.sheepCount} step={5} min={5} max={1000} valueLabelDisplay="auto" />
          </Box>
          <Box width={150}>
            <Typography>sebesség:</Typography>
            <Slider onChange={handleChange} disabled={disabled} name="speed" value={formData.speed} step={1} min={1} max={10} valueLabelDisplay="auto" />
          </Box>
        </Box>
        <Box>
          <Box width={150}>
            <Typography>szélesség:</Typography>
            <Slider onChange={handleChange} disabled={disabled} name="width" value={formData.width} step={10} min={100} max={1000} valueLabelDisplay="auto" />
          </Box>
          <Box width={150}>
            <Typography>magasság:</Typography>
            <Slider onChange={handleChange} disabled={disabled} name="height" value={formData.height} step={10} min={100} max={1000} valueLabelDisplay="auto" />
          </Box>
        </Box>
      </Box>
      <ButtonGroup>
        <Button variant="contained" disabled={disabled} type="submit">Indítás</Button>
        <Button variant="contained" color="error" disabled={!disabled} type="button" onClick={stopSimulation}>Leállítás</Button>
      </ButtonGroup>
    </Paper>
  );
}

export default Settings;
