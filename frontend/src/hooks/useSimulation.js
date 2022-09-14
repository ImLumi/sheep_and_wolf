import { useCallback, useEffect, useState } from 'react';

const useSimulation = (socket) => {
  const [status, setStatus] = useState('Disconnected');
  const [sheep, setSheep] = useState([]);
  const [wolf, setWolf] = useState({});
  const [screen, setScreen] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    socket.on('connect', () => {
      setStatus('Connected');
    });

    socket.on('running', (data) => {
      if (data?.isFinish) setIsRunning(false);
      else {
        setSheep(data.sheep);
        setWolf(data.wolf);
        setScreen(data.screen);
      }
    });

    return () => {
      socket.off('connect', () => setStatus('disconnected'));
      socket.off('running');
    };
  }, []);

  const startSimulation = useCallback((opts) => {
    socket.emit('startSimulation', opts);
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    socket.emit('running', { cmd: 'stop' });
    setIsRunning(false);
  }, []);

  return {
    status, sheep, wolf, screen, isRunning, startSimulation, stopSimulation,
  };
};

export default useSimulation;
