import React, {useState, useEffect} from "react";
import Header from "./Header";
import AddButton from "./AddButton";
import ListProducts from "./ListProducts";
import Form from "./Form";
import { Modal, Button, Container } from "react-bulma-components";
import { saveProduct, getProducts } from "../services";
import Loading from "./Loading";




const ProductLayout = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
 
 
    const handleSubmit = async (data) => {
        await saveProduct(data);
        loadProducts();
        setIsModalOpen(false);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function loadProducts() {
        const response = await getProducts();
        if (response.status === 200) {
            setProducts(response.data.products);
        }
        setIsLoading(false);
    }



    useEffect(() => {
        loadProducts();
    }, []);



    return (
        <>
        <Container>
            <Header title="Products app" />
            <AddButton onClick={() => {
                setIsModalOpen(true)
            }} />
            {isLoading && <Loading />}

            {products.length === 0 && !isLoading && (
                <h2 className="title has-text-centered">You don't have products</h2>
            )}

            {products.length > 0 && !isLoading && <ListProducts products = {products} />}

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add Product</p>
                        <button className="delete" aria-label="close" onClick={() => setIsModalOpen(false)} />
                    </header>
                    <section className="modal-card-body"><Form handleSubmit={handleSubmit} /></section>

                </div>
            </Modal>
            </Container>
        </>
    );
}

export default ProductLayout;