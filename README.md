# node-mongodb
This is sample server code using node.js and MongoDB

## prerequisite

### mongodb-win32-x86_64-2012plus-4.2.5-signed.msi
Download from https://dl.mongodb.org/dl/win32/x86_64 and install MongoDB and configure on your local and just start this service

### nosqlbooster4mongo-5.2.10.exe
Download from https://www.nosqlbooster.com and install GUI tool to run view database and collections

### Postman-win64-7.22.1-Setup.exe
Download from https://www.postman.com/downloads/ and install postman to test all end points 


## Data base used in this project
### DB name: mydb, table name: products, all CRUD operations are performed in node.js

### A typical top-level directory layout

 node-mongoDB
    ├── controllers                   # Business logic
    ├── models                        # Model 
    ├── routes                        # contain routes for all end points
    ├── app.js                        # Server configurations code
    ├── package.json                  # All dependencies
    ├── package-lock.json
    └── README.md

## product.model.js
```python
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**Product attributes */
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
```
## product.controller.js
It contains only create method
```python
const Product = require('../models/product.model');

/**Create product using save function of mongodb */
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

```
## product.route.js
```python
const express = require('express');
const router = express.Router();

/**Product controller!!**/
const product_controller = require('../controllers/product.controller');

/** * End points for CRUD operations**/

router.post('/create', product_controller.product_create); // Create produc

module.exports = router;
```


