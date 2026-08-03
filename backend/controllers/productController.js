import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Unable to fetch products' });
    }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Invalid product ID' });
    }
};

// @desc    Create a new PC product listing
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, images, isFeatured, specs, countInStock } = req.body;

        const product = new Product({
            name,
            price,
            description,
            images,
            isFeatured: Boolean(isFeatured),
            specs,
            countInStock
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a PC product listing
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, images, isFeatured, specs, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price ?? product.price;
            product.description = description || product.description;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? Boolean(isFeatured) : product.isFeatured;
            product.specs = specs || product.specs;
            product.countInStock = countInStock ?? product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a PC product listing
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};