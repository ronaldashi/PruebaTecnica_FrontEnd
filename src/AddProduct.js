import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = ({ onAddProduct, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidadEnStock, setCantidadEnStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (!nombre || !descripcion || !precio || !cantidadEnStock) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/productos', {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        cantidadEnStock: parseInt(cantidadEnStock)
      });
      onAddProduct();      
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Producto</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" value={precio} onChange={e => setPrecio(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="cantidadEnStock">Cantidad en Stock:</label>
          <input type="number" id="cantidadEnStock" value={cantidadEnStock} onChange={e => setCantidadEnStock(e.target.value)} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;
