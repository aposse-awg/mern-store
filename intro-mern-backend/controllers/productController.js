const { get } = require('mongoose');
const Product = require('../models/Product');

async function addProduct(req, res) {
    try {
        // Extract fields from body
        const { name, price, size, description } = req.body;

        // If an image was uploaded via multer, use its path/filename
        let imageUrl = req.body.imageUrl;
        if (req.file) {
            // multer provides req.file.path in diskStorage
            imageUrl = req.file.path || req.file.filename;
        }

        // Cast numeric fields explicitly
        const product = new Product({
            name,
            price: price ? Number(price) : undefined,
            size: size ? Number(size) : undefined,
            description,
            imageUrl,
        });

        const productStored = await product.save();
        res.status(201).send({ productStored });
    } catch (error) {
        // If it's a mongoose validation error, return 400 with details
        if (error.name === 'ValidationError') {
            return res.status(400).send({ success: false, error: error.message, details: error.errors });
        }
        console.error('addProduct error:', error);
        res.status(500).send({ success: false, error: error.message });
    }
}

async function getProducts(req, res) {
    const products = await Product.find().lean().exec();
res.status(200).send({products});
}


async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        console.log('deleteProduct called for id:', id);
        const deleted = await Product.findByIdAndDelete(id).exec();
        if (!deleted) return res.status(404).send({ success: false, message: 'Product not found' });
        return res.status(200).send({ success: true, message: 'Product deleted', product: deleted });
    } catch (error) {
        console.error('deleteProduct error:', error);
        return res.status(500).send({ success: false, error: error.message });
    }
}

module.exports = { addProduct, getProducts, deleteProduct };