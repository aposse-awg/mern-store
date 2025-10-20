import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { getProducts, deleteProduct } from "../services";
import { Card, Button } from "react-bulma-components";

// Componente principal que muestra la lista de productos
const ListProducts = ({ products: initialProducts = [] }) => {
    // Estado para manejar la lista de productos y el estado de carga
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect se ejecuta cuando el componente se monta o cuando initialProducts cambia
    useEffect(() => {
        // Si no hay productos iniciales, cargarlos desde el servidor
        if (!initialProducts || initialProducts.length === 0) {
            setIsLoading(true);
            getProducts()
                .then((res) => setProducts(res.data.products || []))
                .catch((e) => console.error("getProducts error", e))
                .finally(() => setIsLoading(false));
        }
    }, [initialProducts]);



    // Función para manejar la eliminación de un producto
    const handleDelete = async (productId) => {
        try {
            // Primero elimina el producto en el backend
            await deleteProduct(productId);
            // Si la eliminación fue exitosa, actualiza la lista local de productos
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar el producto');
        }
    }
    // URL base para las imágenes de los productos
    const baseUrl = (process.env.REACT_APP_BASE_URL || "").replace("/v1", "");

    // Muestra el componente de carga mientras se obtienen los productos
    if (isLoading) return <Loading />;

    return (
        // Grid de productos usando clases de Bulma
        <div className="columns is-multiline">
            {/* Itera sobre cada producto para crear su tarjeta */}
            {products.map((product) => (
                // Cada producto ocupa un cuarto del ancho disponible
                <div className="column is-one-quarter" key={product._id}>
                    <Card>
                        <Card.Content>
                            {/* Información del producto */}
                            <h2 className="title">{product.name}</h2>
                            <p className="subtitle">{product.description}</p>
                            <p className="subtitle">Price: {product.price}</p>
                            <p className="subtitle">Size: {product.size}</p>
                            {/* Muestra la imagen del producto si existe */}
                            {product.imageUrl && (
                                <img
                                    src={`${baseUrl}/${product.imageUrl.replace(/^\.\//, "")}`}
                                    alt={product.name}
                                />
                            )}
                           {/* Botón de eliminar */}
                           <div style={{ marginTop: '1rem' }}>
                                <Button 
                                    color="danger" 
                                    onClick={() => handleDelete(product._id)}
                                    fullwidth
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default ListProducts;