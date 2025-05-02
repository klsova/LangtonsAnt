import React from 'react';

const Controls = ({ isRunning, setIsRunning, speed, setSpeed, step, reset }) => {
  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pysäytä' : 'Aloita'}
      </button>
      <button onClick={step}>Yksi askel</button>
      <button onClick={reset}>Resetoi</button>
      <div>
        Nopeus:
        <input 
          type="range" 
          min="1" 
          max="1000" 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))} 
        />
        {speed}ms
      </div>
    </div>
  );
};

export default Controls;