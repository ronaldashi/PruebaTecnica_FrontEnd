import React from 'react';
import axios from 'axios';

class DeleteProduct extends React.Component {
    static async deleteProduct(productId) {
        try {
            await axios.delete(`http://localhost:8080/api/productos/${productId}`);
            console.log('Producto eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }

    render() {
        return null; // O un componente vacío si no es necesario renderizar nada
    }
}

export default DeleteProduct;
