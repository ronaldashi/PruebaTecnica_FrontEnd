import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './SimpleTable.css'; 

const CatFactsModal = () => {
  const [catFacts1, setCatFacts1] = useState([]);
  const [catFacts2, setCatFacts2] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCatFacts();
  }, []);

  const fetchCatFacts = async () => {
    try {
      const response1 = await axios.get('https://meowfacts.herokuapp.com/?lang=esp');
      const response2 = await axios.get('https://meowfacts.herokuapp.com/?lang=esp');
      setCatFacts1(response1.data.data);
      setCatFacts2(response2.data.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching cat facts:', error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal-container" overlayClassName="modal-overlay">
      <h2>Sabías que...</h2>
      <ul>
        {catFacts1.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
        {catFacts2.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
      <button onClick={closeModal}>Cerrar</button>
    </Modal>
  );
};

export default CatFactsModal;
