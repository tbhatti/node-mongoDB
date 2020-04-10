const express = require('express');
const router = express.Router();

/**Product controller!!**/
const product_controller = require('../controllers/product.controller');

/** * End points for CRUD operations**/

router.post('/create', product_controller.product_create); // Create produc
router.get('/:id', product_controller.product_details); // Retrieve product
router.put('/:id/update', product_controller.product_update); // Update product
router.delete('/:id/delete',product_controller.product_delete); // Delete product

module.exports = router;