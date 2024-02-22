import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SimpleTable.css';

function UselessFact() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetchUselessFact();
  }, []);

  const fetchUselessFact = async () => {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=es');
      setFact(response.data.text);
    } catch (error) {
      console.error('Error fetching useless fact:', error);
    }
  };

  return (
    <div>
      <h3>Dato inútil del día:</h3>
      <p>{fact}</p>
    </div>
  );
}

export default UselessFact;
