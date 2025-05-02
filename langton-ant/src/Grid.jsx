import React from 'react';

const Grid = ({ grid, antPosition }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 10px)` }}>
      {grid.map((row, y) => 
        row.map((cell, x) => (
          <div 
            key={`${y}-${x}`}
            style={{
              width: 10,
              height: 10,
              backgroundColor: cell === 0 ? 'white' : 'black',
              border: '1px solid #ddd',
              position: 'relative'
            }}
          >
            {x === antPosition.x && y === antPosition.y && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'red'
              }} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;