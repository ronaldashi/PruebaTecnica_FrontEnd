import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryTotal.css'; 

function InventoryTotal() {
  const [inventoryTotal, setInventoryTotal] = useState(0);

  useEffect(() => {
    fetchInventoryTotal();
  }, []);

  const fetchInventoryTotal = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos/calcular-valor-total');
      setInventoryTotal(response.data);
    } catch (error) {
      console.error('Error fetching inventory total:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="inventory-total-container">
      <h2>Total del Inventario</h2>
      <p className="inventory-total-value">{formatCurrency(inventoryTotal)}</p>
    </div>
  );
}

export default InventoryTotal;
