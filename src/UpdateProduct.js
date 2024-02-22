import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const UpdateProduct = ({ product, onClose }) => {
  const [nombre, setNombre] = useState(product.nombre);
  const [descripcion, setDescripcion] = useState(product.descripcion);
  const [precio, setPrecio] = useState(String(product.precio));
  const [cantidadEnStock, setCantidadEnStock] = useState(String(product.cantidadEnStock));
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (!nombre || !descripcion || !precio || !cantidadEnStock) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/productos/${product.id}`, {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        cantidadEnStock: parseInt(cantidadEnStock)
      });
      onClose(); // Cierra el formulario después de guardar cambios
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Editar Producto</h2>
      <form className="update-product-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">GUARDAR CAMBIOS</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
