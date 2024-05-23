const asyncHandler = require('express-async-handler');
// middleware
const  { BadRequestError, UnauthorizedError } = require('../middleware/errorMiddleware');
// model
const Product = require('../models/productModels');

// @desc Create product
// @route POST /api/products/create
// @access Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, price, availableForSale } = req.body;

    if (!name || !brand || !price || !availableForSale) {
        throw new BadRequestError('Please fill in all fields');
    }

    const product = await Product.create({
         user: req.user.id,
            name,
            brand,
            price,
            availableForSale,
    });

    if (product) {
        res.status(201).json({
            _id: product._id,
            user: product.user,
            name: product.name,
            brand: product.brand,
            price: product.price,
            availableForSale: product.availableForSale,
        });
    } else {
        throw new BadRequestError('Invalid product data');
    }
});

// @desc Update Todo 
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, brand, price, availableForSale } = req.body;
    
    if (!name, !brand, !price, !availableForSale) {
        throw new BadRequestError('Please fill in all fields');
    }

    if (!req.user){
        throw new UnauthorizedError('Unauthorized access')
    }

    const product = await Product.findById(id);

    if (product.user.toString() !== req.user.id.toString()) {
        throw new UnauthorizedError('Unauthorized access')
    }

    if (product) {
        product.name = name;
        product.brand = brand;
        product.price = price;
        product.availableForSale = availableForSale;
        
        const updateProduct = await product.save();

        res.json(updateProduct);
    } else {
        throw new BadRequestError('Invalid product data');
    }
})

// @desc DELETE poduct
// @route DELETE /api/products/:id
// @access Private
const deleteProduct =  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!req.user){
        throw new UnauthorizedError('Unauthorized access')
    }

    const product = await Product.findByIdAndDelete(id);

    if (product.user.toString() !== req.user.id.toString()) {
        throw new UnauthorizedError('Unauthorized access')
    }

    if (product) {
        res.json({ message: ' Product removed' });
    } else {
        throw new BadRequestError('Invalid product data');
    }

})

// @desc Get all products by user id
// @route GET /api/products/:id
// @access Private
const getProductsByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if ( !id ) {
        throw new BadRequestError('Invalid user id');
    }

    try {
        const products = await todo.find({ user: id });

        res.json(products);
    } catch (error) {
        throw new BadRequestError('Invalid user id');
    }

})

// @desc Get all products
// @route GET /api/products
// @access Public
const getALLProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
})

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByUserId,
    getALLProducts,
}