import React, { useState, useEffect} from 'react';
import Grid from './Grid';
import Controls from './Controls';
import RuleEditor from './RuleEditor';
import './App.css'


function App() {
  const [gridSize, setGridSize] = useState({ width: 100, height: 100 });
  const [antPosition, setAntPosition] = useState({ x: 50, y: 50 });
  const [antDirection, setAntDirection] = useState(0); // 0: ylös, 1: oikealle, 2: alas, 3: vasemalle
  const [grid, setGrid] = useState(Array(gridSize.height).fill().map(() => Array(gridSize.width).fill(0)));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [rules, setRules] = useState([
    { color: 0, turn: 1, nextColor: 1 }, // Oletus: musta -> oikealle, vaihda valkoiseksi
    { color: 1, turn: -1, nextColor: 0 }  // Valkoinen -> vasemmalle, vaihda mustaksi
  ])
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    setGrid(Array(gridSize.height).fill().map(() => Array(gridSize.width).fill(0)));
    setAntPosition({ x: Math.floor(gridSize.width / 2), y: Math.floor(gridSize.height / 2)});
    setAntDirection(0);
    setGeneration(0);
  }, [gridSize])



  const step = () => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      const { x, y } = antPosition;
      const currentColor = newGrid[y][x];
      const rule = rules.find(r => r.color === currentColor) || rules[0];

      let newDirection = (antDirection + rule.turn + 4) % 4;
      setAntDirection(newDirection);

      newGrid[y][x] = rule.nextColor;

      let newX = x;
      let newY = y;

      switch (newDirection) {
        case 0:
          newY = (y - 1 + gridSize.height) % gridSize.height;
          break;
        case 1:
          newX = (x + 1) % gridSize.width;
          break;
        case 2:
          newY = (y + 1) % gridSize.height;
          break;
        case 3:
          newX = (x - 1 + gridSize.width) % gridSize.width;
          break;
        default:
          break;
      }

      setAntPosition({ x: newX, y: newY });
      setGeneration(prev => prev + 1);
      return newGrid;
      })
  }

  const reset = () => {
    setGrid(Array(gridSize.height).fill().map(() => Array(gridSize.width).fill(0)));
    setAntPosition({ x: Math.floor(gridSize.width / 2), y: Math.floor(gridSize.height / 2)
    });
    setAntDirection(0);
    setGeneration(0);
    setIsRunning(false);
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(step, speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed, grid, antPosition, antDirection]);

  return (
    <div className="App">
      <h1>Langtonin Muurahainen</h1>
      <div className='Info'>
        Iteraatio: {generation} | Sijainti: ({antPosition.x}, {antPosition.y}) | Suunta: {['Ylös', 'Oikealle', 'Alas', 'Vasemmalle'] [antDirection]}
      </div>
      <RuleEditor rules={rules} setRules={setRules} />
      <div className="grid-controls">
        <label>
          Leveys:
          <input 
            type="number" 
            value={gridSize.width} 
            onChange={(e) => setGridSize(prev => ({ ...prev, width: Math.max(1, parseInt(e.target.value) || 1) }))} 
            disabled={isRunning}
          />
        </label>
        <label>
          Korkeus:
          <input 
            type="number" 
            value={gridSize.height} 
            onChange={(e) => setGridSize(prev => ({ ...prev, height: Math.max(1, parseInt(e.target.value) || 1) }))} 
            disabled={isRunning}
          />
        </label>
      </div>
      <Grid grid={grid} antPosition={antPosition} />
      <Controls 
        isRunning={isRunning} 
        setIsRunning={setIsRunning} 
        speed={speed} 
        setSpeed={setSpeed}
        step={step}
        reset={reset}
      />
    </div>
  );
}

export default App;