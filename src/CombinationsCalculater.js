import React, { useState } from 'react';
import axios from 'axios';
import './CombinationsCalculator.css'; // Archivo de estilos CSS

const CombinationsCalculator = () => {
  const [value, setValue] = useState('');
  const [combinations, setCombinations] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCalculateCombinations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/productos/generar-combinaciones?valorObjetivo=${value}`);
      setCombinations(response.data);
      console.log('Combinaciones:', response.data);
    } catch (error) {
      console.error('Error fetching combinations:', error);
    }
  };

  return (
    <div className="combinations-container">
      <h2 className="title">Calculadora de Combinaciones de Productos</h2>
      <label htmlFor="valueInput" className="label">Ingrese un valor numérico:</label>
      <input
        type="number"
        id="valueInput"
        className="input"
        value={value}
        onChange={handleChange}
      />
      <button className="button" onClick={handleCalculateCombinations}>Calcular Combinaciones</button>
      <div className="combinations-list">
        {combinations && combinations.length > 0 ? (
          <ul>
            {combinations.map((combination, index) => (
              <li key={index}>
                {combination.length > 0 ? (
                  <span>[
                    {combination.map((product, index) => (
                      <span key={index}>{product.nombre} - </span>
                    ))}
                     {combination.reduce((total, product) => total + product.precio, 0)}         
                  ]</span>
                ) : (
                  <span>No hay productos en esta combinación</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default CombinationsCalculator;
