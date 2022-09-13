import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('ws://localhost:3030');
function App() {
  const [status, setStatus] = useState('nincs');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
      socket.on('connect', () => {
        setStatus('Connected');
      });

    socket.on('disconnect', () => {
      setStatus('disconnected');
    })

    socket.on('running', (res) => {
      setCounter(res);
    })

    return () => {
      socket.off('connect', () => setStatus('disconnected'))
      socket.off('disconnect', () => setStatus('disconnected'))
      socket.off('running', () => setStatus('disconnected'))
    }
  }, []);
  return (
    <div className="App">
      <input
        type="number"
        value={counter}
        onChange={({target: {value}}) => setCounter(value)}
      />
      <button onClick={() => {socket.emit('createSimulator', { counter })}}>Start</button>
      <button onClick={() => {socket.emit('running', { cmd: 'stop' })}}>stop</button>
    </div>
  );
}

export default App;
