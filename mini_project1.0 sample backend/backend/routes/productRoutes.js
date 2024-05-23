const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByUserId,
    getALLProducts,
} = require('../controllers/productController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/:id', protect, getProductsByUserId);
router.get('/', getALLProducts);

module.exports = router;