import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import ParticlesBackground from './components/ParticlesBackground';
import SimpleTable from './components/SimpleTable';
import UselessFact from './components/UselessFact';
import CatFactsModal from './components/CatFactsModal';
import InventoryTotal from './InventoryTotal';
import CombinationsCalculator from './CombinationsCalculater';
import AddProduct from './AddProduct';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    margin: '8px', 
  },
}));

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [inventoryTotal, setInventoryTotal] = useState(0);
  const [highestInventoryProduct, setHighestInventoryProduct] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
    fetchInventoryData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/productos/calcular-valor-total');
      setInventoryTotal(response.data);
    } catch (error) {
      console.error('Error fetching inventory total:', error);
    }

    try {
      const response = await axios.get('http://localhost:8080/api/productos/generar-combinaciones?valorObjetivo=' + inventoryTotal);
      setHighestInventoryProduct(response.data[0]); // Suponiendo que el primer elemento del array es el producto con mayor valor de inventario
    } catch (error) {
      console.error('Error fetching highest inventory product:', error);
    }
  };

  const handleAddProduct = async () => {
    await fetchProducts();
    setShowAddProductModal(false);
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  return (
    <div className='App'>
      <ParticlesBackground id="particles"/>
      {showAddProductModal ? (
        <AddProduct onAddProduct={handleAddProduct} onClose={handleCloseAddProductModal} />
      ) : (
        <>
        <CombinationsCalculator />
          <SimpleTable products={products} setShowAddProductButton={setShowAddProductModal} />
          <br></br>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => setShowAddProductModal(true)}
          >
            Agregar Producto
          </Button>
          <InventoryTotal />
        </>
      )}
      <footer>
        <UselessFact />
        <CatFactsModal />
      </footer>
    </div>
  );
};

export default ProductList;
