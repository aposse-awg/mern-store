import axios from "axios";

// URL base para todas las peticiones a la API
const baseUrl = process.env.REACT_APP_BASE_URL;

// Función para obtener todos los productos
export async function getProducts() {
    try {
        const response = await axios({
            method: "GET",
            url: `${baseUrl}/products`,
        })
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para guardar un nuevo producto
export async function saveProduct(productData) {
    try {
        // Crear un FormData para enviar datos incluyendo la imagen
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("size", productData.size);
        formData.append("description", productData.description);
        formData.append("image", productData.image);
        
        // Enviar la petición POST al servidor
        const response = await axios({
            method: "POST",
            url: `${baseUrl}/products`,
            data: formData,
        })
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para eliminar un producto por su ID
export async function deleteProduct(id) {
    try {
        // Enviar petición DELETE al servidor
        const response = await axios({
            method: 'DELETE',
            url: `${baseUrl}/products/${id}`,
        });
        return response;
    } catch (e) {
        console.log('deleteProduct error', e);
        // Lanzar el error para manejarlo en el componente
        throw e;
    }
}