import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SimpleTable.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import DeleteProduct from '../DeleteProduct';
import UpdateProduct from '../UpdateProduct';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    gap: '8px',
  },
}));

function SimpleTable({ products, setShowAddProductButton }) {
  const [data, setData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [, setInventoryTotal] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    fetchData();
    fetchInventoryTotal(); // Obtener el valor del inventario total al cargar el componente
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchInventoryTotal = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos/calcular-valor-total');
      setInventoryTotal(response.data);
    } catch (error) {
      console.error('Error fetching inventory total:', error);
    }
  };

  const handleUpdate = async (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
    setShowTable(false);
    setShowAddProductButton(false);
    await fetchData();
    await fetchInventoryTotal();
  };

  const handleDelete = async (productId) => {
    await DeleteProduct.deleteProduct(productId);
    window.location.reload(); 
  };
  
  const handleSaveChanges = async () => {
    setShowTable(true);
    setShowUpdateForm(false);
    await fetchData();
    window.location.reload(); 
  };

  return (
    <div className="container">
    
      {showTable && (
        <>
          <h2 className="center">Tabla de Productos</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.cantidadEnStock}</td>
                  <td>{product.precio}</td>
                  <td className={classes.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(product)}>Modificar</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showUpdateForm && (
        <UpdateProduct
          product={selectedProduct}
          onClose={handleSaveChanges}
        />
      )}
    </div>
  );
}

export default SimpleTable;
