import { io } from 'socket.io-client';
import {
  Box, ScopedCssBaseline, Typography,
} from '@mui/material';
import useSimulation from './hooks/useSimulation';
import Canvas from './components/Canvas';
import Settings from './components/Settings';

const socket = io('ws://localhost:3030');

function App() {
  const {
    status, sheep, wolf, isRunning, startSimulation, stopSimulation, screen,
  } = useSimulation(socket);
  return (
    <ScopedCssBaseline>
      <Box
        width="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h5">Bárányok és a farkas szimuláció</Typography>
        <Typography>
          szerver státusz: {status}
        </Typography>
        <Settings
          disabled={isRunning}
          startSimulation={startSimulation}
          stopSimulation={stopSimulation}
        />
        <Canvas
          width={screen.width}
          height={screen.height}
          sheep={sheep}
          wolf={wolf}
        />
      </Box>
    </ScopedCssBaseline>
  );
}

export default App;
