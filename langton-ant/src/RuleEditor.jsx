import React from 'react';

const RuleEditor = ({ rules, setRules }) => {
  const addRule = () => {
    setRules([...rules, { color: 0, turn: 1, nextColor: 1 }]);
  };

  const updateRule = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = Number(value);
    setRules(newRules);
  };

  return (
    <div>
      <h3>Säännöt</h3>
      {rules.map((rule, index) => (
        <div key={index}>
          Jos väri: 
          <input 
            type="number" 
            value={rule.color} 
            onChange={(e) => updateRule(index, 'color', e.target.value)} 
          />
          Käännös:
          <select 
            value={rule.turn} 
            onChange={(e) => updateRule(index, 'turn', e.target.value)}
          >
            <option value={1}>Oikealle (90°)</option>
            <option value={-1}>Vasemmalle (-90°)</option>
            <option value={2}>Käännä (180°)</option>
          </select>
          Uusi väri:
          <input 
            type="number" 
            value={rule.nextColor} 
            onChange={(e) => updateRule(index, 'nextColor', e.target.value)} 
          />
        </div>
      ))}
      <button onClick={addRule}>Lisää sääntö</button>
    </div>
  );
};

export default RuleEditor;